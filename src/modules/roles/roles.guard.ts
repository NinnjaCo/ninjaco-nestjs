import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { JwtPayload } from 'modules/auth/interfaces'
import { Reflector } from '@nestjs/core'
import { RoleEnum } from './roles.enum'
import { RolesService } from './roles.service'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private roleService: RolesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.getAllAndOverride<RoleEnum[]>('roles', [
      context.getClass(),
      context.getHandler(),
    ])

    // No Roles decorator used, allow access
    if (!roles || !roles.length) {
      return true
    }
    const request = context.switchToHttp().getRequest()
    const user = request.user as JwtPayload
    const userRole = await this.roleService.getRoleById(user.role_id)
    return roles.includes(userRole.role)
  }
}
