import { AuthResponse, JwtPayload, Tokens } from './interfaces'
import { ConfigService } from '@nestjs/config'
import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { MailService } from '../mail/mail.service'
import { ResetPasswordDto } from './dto/reset-password.dto'
import { RolesService } from '../roles/roles.service'
import { SignInDto } from './dto/signin.dto'
import { SignUpDto } from './dto/signup.dto'
import { UNAUTHORIZED_EXCEPTION_MESSAGE } from '../../common/constants'
import { UsersService } from '../users/users.service'
import { ValidateTokenRoleDto } from './dto/validate-token-role.dto'
import { hashData, isHashMatched } from '../../common/shared'
import { verifyEmailDto } from './dto/verify-email.dto'

@Injectable()
export class AuthService {
  private readonly JWT_ACCESS_SECRET: string
  private readonly JWT_REFRESH_SECRET: string

  /**
   * @param usersService
   * @param jwtService
   * @param configService
   * @description get the JWT_ACCESS_SECRET and JWT_REFRESH_SECRET from the config service
   * @description inject the users service, jwt service and config service
   */
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
    private readonly rolesService: RolesService
  ) {
    this.JWT_ACCESS_SECRET = this.configService.get('JWT_ACCESS_SECRET')
    this.JWT_REFRESH_SECRET = this.configService.get('JWT_REFRESH_SECRET')
  }

  /**
   * Service that create a user in the database and return the jwt tokens
   * @param signUpDto
   * @returns Promise<Tokens>
   * @description create a user in the database
   * @description create jwt tokens from the user id and email
   * @description update the user hashedRt in the database with the newly created refresh token
   */
  async signUp(signUpDto: SignUpDto): Promise<AuthResponse> {
    const user = await this.usersService.create(signUpDto)

    const tokens = await this.getTokens(user._id.toString(), user.role._id.toString())
    await this.updateUserRtHash(user._id.toString(), tokens.refresh_token)
    //create a verification token
    const verificationToken = await this.jwtService.signAsync(
      { sub: user._id.toString() },
      {
        secret: this.JWT_ACCESS_SECRET, // Sign it with the access secret, because it can be decoded on the client side
        expiresIn: '24h',
      }
    )
    const hashedToken = await hashData(verificationToken)
    //save token in the database
    await this.usersService.update(user._id.toString(), { verifyEmailToken: hashedToken })
    //send verification email
    await this.mailService.sendVerifyEmail(user, verificationToken)

    user.password = undefined
    user.hashedRt = undefined
    return { user, ...tokens }
  }

  /**
   * Service that return the jwt tokens
   * @param signInDto
   * @returns Promise<Tokens>
   * @description find the user in the database by email
   * @description check if the user exists
   * @description check if the password matches
   * @description create jwt tokens from the user id and email
   * @description update the user hashedRt in the database with the newly created refresh token
   * @description return the tokens
   */
  async signIn(signInDto: SignInDto): Promise<AuthResponse> {
    const user = await this.usersService.findOneByEmail(signInDto.email)

    if (!user) throw new UnauthorizedException(UNAUTHORIZED_EXCEPTION_MESSAGE)

    const passwordMatches = await isHashMatched(signInDto.password, user.password)
    if (!passwordMatches) throw new UnauthorizedException(UNAUTHORIZED_EXCEPTION_MESSAGE)

    const tokens = await this.getTokens(user._id.toString(), user.role._id.toString())
    await this.updateUserRtHash(user._id.toString(), tokens.refresh_token)

    user.password = undefined
    user.hashedRt = undefined

    return {
      user,
      ...tokens,
    }
  }

  /**
   * Service that delete the hashedRt in the database
   * @param userId
   * @returns Promise<boolean>
   * @description delete the hashedRt in the database
   */
  async logout(userId: string): Promise<boolean> {
    await this.usersService.update(userId, { hashedRt: null })
    return true
  }

  /**
   * Service that return the jwt tokens
   * @param userId
   * @param rt
   * @returns Promise<Tokens>
   * @description find the user in the database by id
   * @description check if the user exists
   * @description check if the hashedRt exists
   * @description check if the refresh token matches
   * @description create jwt tokens from the user id and email
   * @description update the user hashedRt in the database with the newly created refresh token
   */
  async refreshTokens(userId: string, rt: string): Promise<AuthResponse> {
    const user = await this.usersService.findOne(userId)

    if (!user || !user.hashedRt) throw new UnauthorizedException(UNAUTHORIZED_EXCEPTION_MESSAGE)

    const rtMatches = await isHashMatched(rt, user.hashedRt)
    if (!rtMatches) throw new UnauthorizedException(UNAUTHORIZED_EXCEPTION_MESSAGE)

    const tokens = await this.getTokens(user._id.toString(), user.role._id.toString())
    await this.updateUserRtHash(user._id.toString(), tokens.refresh_token)

    user.password = undefined
    user.hashedRt = undefined

    return {
      user,
      ...tokens,
    }
  }

  /**
   * Service that update the hashedRt in the database
   * @param userId
   * @param rt
   * @returns Promise<void>
   * @description hash the refresh token
   * @description update the user hashedRt in the database with the newly created refresh token
   */
  async updateUserRtHash(userId: string, rt: string): Promise<void> {
    const hash = await hashData(rt)
    await this.usersService.update(userId, { hashedRt: hash })
  }

  /**
   * Service that return the jwt tokens
   * @param userId
   * @returns Promise<Tokens>
   * @description create jwt tokens from the user id and email
   */
  async getTokens(userId: string, roleId): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      role_id: roleId,
    }

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.JWT_ACCESS_SECRET,
        expiresIn: '2d',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.JWT_REFRESH_SECRET,
        expiresIn: '10d',
      }),
    ])

    return {
      access_token: at,
      refresh_token: rt,
    }
  }

  /**
   * Service that given an email, send an email with a link to reset the password and save the token in the database
   * @param email
   * @returns Promise<boolean>
   * @description find the user in the database by email
   * @description check if the user exists
   * @description create a token with expiration date of 24 hours
   * @description hash and save the token in the database
   * @description send the email with the link to reset the password
   */
  async forgotPassword(email: string): Promise<boolean> {
    const user = await this.usersService.findOneByEmail(email)

    if (!user) throw new UnauthorizedException(UNAUTHORIZED_EXCEPTION_MESSAGE)

    // create a token with expiration date of 24 hours
    const token = await this.jwtService.signAsync(
      { sub: user._id.toString() },
      {
        secret: this.JWT_ACCESS_SECRET, // Sign it with the access secret, because it can be decoded on the client side
        expiresIn: '24h',
      }
    )

    const hashedToken = await hashData(token)

    // save the token in the database
    try {
      await this.usersService.update(user._id.toString(), { resetPasswordToken: hashedToken })
    } catch (error) {
      throw new InternalServerErrorException("Something went wrong, we couldn't send the email")
    }

    const sentTheEmail = await this.mailService.sendForgotPasswordMail(user, token)

    return sentTheEmail
  }

  /**
   * Service that given a token, reset the password and delete the token in the database
   * @param resetPasswordDto
   * @returns Promise<boolean>
   * @description find the user in the database by id
   * @description check if the user exists
   * @description check if the token matches
   * @description hash and save the new password in the database
   * @description delete the token in the database
   */
  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<boolean> {
    const user = await this.usersService.findOne(resetPasswordDto.userId)

    if (!user) throw new UnauthorizedException(UNAUTHORIZED_EXCEPTION_MESSAGE)
    const tokenMatches = await isHashMatched(resetPasswordDto.token, user.resetPasswordToken)
    if (!tokenMatches) throw new UnauthorizedException(UNAUTHORIZED_EXCEPTION_MESSAGE)

    // the usersService will hash the password
    await this.usersService.update(user._id.toString(), {
      password: resetPasswordDto.password,
      resetPasswordToken: null,
    })

    return true
  }

  /**
   * Service that given a token and a role validates that the owner of that token has that role
   * @param validateTokenRoleDto
   * @returns Promise<boolean>
   * @description verify the token
   * @description find the role in the database by id
   * @description check if the role exists
   * @description check if the role matches
   */
  async validateTokenRole(validateTokenRoleDto: ValidateTokenRoleDto): Promise<boolean> {
    const decodedToken = await this.jwtService.verifyAsync(validateTokenRoleDto.token, {
      secret: this.JWT_ACCESS_SECRET,
    })

    const role = await this.rolesService.getRoleById(decodedToken.role_id)
    if (!role) return false

    if (validateTokenRoleDto.alloweRoles.includes(role.role)) return true

    return false
  }

  /**
   * service that given a token, verify the email and delete the token in the database
   * @param token
   * @returns Promise<boolean>
   * @description decode the token to get the user id
   * @description find the user in the database by id
   * @description check if the user exists
   * @description check if the token matches
   * @description update the user to be verified and delete the token in the database
   */
  async verifyEmail(verifyEmailDto: verifyEmailDto): Promise<boolean> {
    const decodedToken = await this.jwtService.verifyAsync(verifyEmailDto.token, {
      secret: this.JWT_ACCESS_SECRET,
    })

    const user = await this.usersService.findOne(decodedToken.sub)
    if (!user) throw new UnauthorizedException(UNAUTHORIZED_EXCEPTION_MESSAGE)
    //compare the token with the one in the database
    const tokenMatches = await isHashMatched(verifyEmailDto.token, user.verifyEmailToken)
    if (!tokenMatches) throw new UnauthorizedException(UNAUTHORIZED_EXCEPTION_MESSAGE)

    // Update the user to be verified
    await this.usersService.update(user._id.toString(), {
      isVerified: true,
      verifyEmailToken: null,
    })
    return true
  }
}
