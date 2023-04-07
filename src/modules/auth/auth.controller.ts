import { ApiGlobalResponse } from 'common/decorators/api-global-response.decorators'
import { ApiTags } from '@nestjs/swagger'
import { AuthResponse } from './interfaces'
import { AuthService } from './auth.service'
import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { BooleanSchema } from 'swagger/swagger-primitive-type'
import { GetCurrentUser } from '../../common/decorators/get-current-user.decorator'
import { GetCurrentUserId } from '../../common/decorators/get-current-user-id.decorator'
import { Public } from '../../common/decorators/public.decorator'
import { RtGuard } from './guards/rt.guard'
import { SignInDto } from './dto/signin.dto'
import { SignUpDto } from './dto/signup.dto'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/local/signup')
  async register(@Body() body: SignUpDto): Promise<AuthResponse> {
    return this.authService.signUp(body)
  }

  @Public()
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
  @Post('refresh')
  async refreshTokens(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string
  ): Promise<AuthResponse> {
    return this.authService.refreshTokens(userId, refreshToken)
  }
}
