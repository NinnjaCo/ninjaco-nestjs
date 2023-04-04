import { ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common'
import { Tokens } from './types'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/local/signup')
  async register(@Body() body: SignupDto): Promise<Tokens> {
    const user = await this.authService.signup(body.email, body.password)
    return this.authService.signin(user)
  }

  @Post('/local/signin')
  async login(@Body() body: SignInDto): Promise<Tokens> {
    const user = await this.authService.validateUser(body.email, body.password)
    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }
    return this.authService.signin(user)
  }

  @Post('refresh')
  async refresh(@Body() body: RefreshDto): Promise<Tokens> {
    return this.authService.refresh(body.refreshToken)
  }

  @Post('logout')
  async logout(@Body() body: LogoutDto): Promise<void> {
    return this.authService.logout(body.refreshToken)
  }
}
