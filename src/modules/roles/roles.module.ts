import { Logger, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Role, RoleSchema } from './schemas/role.schema'
import { RoleEnum } from './roles.enum'
import { RolesRepository } from './roles.repository'
import { RolesService } from './roles.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }])],
  providers: [RolesService, RolesRepository],
  exports: [RolesService],
})
export class RolesModule {
  constructor(private readonly rolesService: RolesService) {
    // go over all the roles and create them if they don't exist
    // all the roles are defined in the RoleEnum
    const logger = new Logger('RolesModule')
    Object.values(RoleEnum).forEach(async (role) => {
      if (!(await this.rolesService.isRoleExist(role))) {
        await this.rolesService.createRole(role)
        logger.log(`Role ${role} created`)
      }
    })
  }
}
