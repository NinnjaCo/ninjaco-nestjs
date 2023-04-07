import { AuthResponse, JwtPayload, Tokens } from './interfaces'
import { ConfigService } from '@nestjs/config'
import { FORBIDDEN_EXCEPTION_MESSAGE } from '../../common/constants'
import { ForbiddenException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { SignInDto } from './dto/signin.dto'
import { SignUpDto } from './dto/signup.dto'
import { UsersService } from '../users/users.service'
import { hashData, isHashMatched } from '../../common/shared'

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
    private readonly configService: ConfigService
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

    if (!user) throw new ForbiddenException(FORBIDDEN_EXCEPTION_MESSAGE)

    const passwordMatches = await isHashMatched(signInDto.password, user.password)
    if (!passwordMatches) throw new ForbiddenException(FORBIDDEN_EXCEPTION_MESSAGE)

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

    if (!user || !user.hashedRt) throw new ForbiddenException(FORBIDDEN_EXCEPTION_MESSAGE)

    const rtMatches = await isHashMatched(rt, user.hashedRt)
    if (!rtMatches) throw new ForbiddenException(FORBIDDEN_EXCEPTION_MESSAGE)

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
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      }),
    ])

    return {
      access_token: at,
      refresh_token: rt,
    }
  }
}
