import { DatabaseService } from '../../database/database.service'
import { Logger, Module, OnApplicationBootstrap } from '@nestjs/common'
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
export class RolesModule implements OnApplicationBootstrap {
  constructor(
    private readonly rolesService: RolesService,
    private readonly databaseService: DatabaseService
  ) {}
  async onApplicationBootstrap() {
    // go over all the roles and create them if they don't exist
    // all the roles are defined in the RoleEnum
    const logger = new Logger('RolesModule')
    await this.databaseService.getDbHandle().asPromise()
    const rolesCollection = this.databaseService.getDbHandle().collection('roles')
    if (rolesCollection) {
      const roles = await rolesCollection.find().toArray()
      if (roles.length === 0) {
        Object.values(RoleEnum).forEach(async (roleName) => {
          // use the Role Model to create the role
          const role = new Role()
          role.role = roleName
          await rolesCollection.insertOne(role)
          logger.log(`Role ${roleName} created`)
        })
      } else {
        logger.log('Roles already exist')
      }
    } else {
      logger.error('Roles collection does not exist')
    }
  }
}
