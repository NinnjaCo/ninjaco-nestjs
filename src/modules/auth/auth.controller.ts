import { ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { GetCurrentUser } from '../../common/decorators/get-current-user.decorator'
import { GetCurrentUserId } from '../../common/decorators/get-current-user-id.decorator'
import { Public } from '../../common/decorators/public.decorator'
import { RtGuard } from './guards/rt.guard'
import { SignInDto } from './dto/signin.dto'
import { SignUpDto } from './dto/signup.dto'
import { Tokens } from './types'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/local/signup')
  async register(@Body() body: SignUpDto): Promise<Tokens> {
    return this.authService.signUp(body)
  }

  @Public()
  @Post('local/signin')
  async signinLocal(@Body() dto: SignInDto): Promise<Tokens> {
    return this.authService.signIn(dto)
  }

  @Post('logout')
  async logout(@GetCurrentUserId() userId: string): Promise<boolean> {
    return this.authService.logout(userId)
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  async refreshTokens(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string
  ): Promise<Tokens> {
    return this.authService.refreshTokens(userId, refreshToken)
  }
}
