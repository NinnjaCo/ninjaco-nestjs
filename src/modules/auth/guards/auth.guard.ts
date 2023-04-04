import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { IS_PUBLIC_KEY } from '../../../common/decorators/public.decorator'
import { JwtService } from '@nestjs/jwt'
import { UNAUTHORIZED_EXCEPTION_MESSAGE } from '../../../common/constants'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = context.getHandler()[IS_PUBLIC_KEY]
    if (isPublic) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)
    if (!token) {
      throw new UnauthorizedException(UNAUTHORIZED_EXCEPTION_MESSAGE)
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET'),
      })
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload
    } catch {
      throw new UnauthorizedException(UNAUTHORIZED_EXCEPTION_MESSAGE)
    }
    return true
  }

  /**
   * Extracts the token from the request header
   * @param request
   * @returns the token or undefined if it doesn't exist
   */
  private extractTokenFromHeader(request: Request): string | undefined {
    const authorization = request.headers['authorization']
    if (!authorization) {
      return undefined
    }
    const [bearer, token] = authorization.split(' ')
    if (bearer !== 'Bearer' || !token) {
      return undefined
    }
    return token
  }
}
