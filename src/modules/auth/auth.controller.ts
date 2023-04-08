import { ApiGlobalResponse } from 'common/decorators/api-global-response.decorators'
import { ApiTags } from '@nestjs/swagger'
import { AuthResponse } from './interfaces'
import { AuthService } from './auth.service'
import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { BooleanSchema } from 'swagger/swagger-primitive-type'
import { ForgotPasswordDto } from './dto/forgot-password.dto'
import { GetCurrentUser } from '../../common/decorators/get-current-user.decorator'
import { GetCurrentUserId } from '../../common/decorators/get-current-user-id.decorator'
import { Public } from '../../common/decorators/public.decorator'
import { ResetPasswordDto } from './dto/reset-password.dto'
import { RtGuard } from './guards/rt.guard'
import { SignInDto } from './dto/signin.dto'
import { SignUpDto } from './dto/signup.dto'
import { Throttle } from '@nestjs/throttler'
import { ValidateTokenRoleDto } from './dto/validate-token-role.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Throttle(5, 60) // 5 requests per minute
  @Post('/local/signup')
  async register(@Body() body: SignUpDto): Promise<AuthResponse> {
    return this.authService.signUp(body)
  }

  @Public()
  @Throttle(10, 60) // 10 requests per minute
  @Post('local/signin')
  async signinLocal(@Body() dto: SignInDto): Promise<AuthResponse> {
    return this.authService.signIn(dto)
  }

  @ApiGlobalResponse(BooleanSchema, {
    description: 'Logout user',
  })
  @Post('logout')
  async logout(@GetCurrentUserId() userId: string): Promise<boolean> {
    return this.authService.logout(userId)
  }

  @Public()
  @ApiGlobalResponse(AuthResponse, {
    description: 'Refresh tokens',
  })
  @UseGuards(RtGuard)
  @Throttle(10, 60) // 10 requests per minute
  @Post('refresh')
  async refreshTokens(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string
  ): Promise<AuthResponse> {
    return this.authService.refreshTokens(userId, refreshToken)
  }

  @Public()
  @ApiGlobalResponse(BooleanSchema, {
    description: 'Send email with link to reset password',
  })
  @Throttle(5, 60) // 5 requests per minute
  @Post('forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordDto): Promise<boolean> {
    return this.authService.forgotPassword(body.email)
  }

  @Public()
  @ApiGlobalResponse(BooleanSchema, {
    description: 'Reset password',
  })
  @Throttle(5, 60) // 5 requests per minute
  @Post('reset-password')
  async resetPassword(@Body() body: ResetPasswordDto): Promise<boolean> {
    return this.authService.resetPassword(body)
  }

  @ApiGlobalResponse(BooleanSchema, {
    description: 'Validate a token role',
  })
  @Throttle(100, 60) // 100 requests per minute
  @Post('validate-token-role')
  async validateTokenRole(@Body() body: ValidateTokenRoleDto): Promise<boolean> {
    return this.authService.validateTokenRole(body)
  }
}
