import { ApiTags } from '@nestjs/swagger'
import { RoleEnum } from './roles.enum'
import { SetMetadata } from '@nestjs/common'

export const Roles = (...roles: RoleEnum[]) => SetMetadata('roles', roles)
