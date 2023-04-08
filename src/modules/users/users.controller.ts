import { ApiGlobalResponse } from 'common/decorators/api-global-response.decorators'
import { ApiTags } from '@nestjs/swagger'
import { ArraySchema } from 'swagger/swagger-primitive-type'
import { Controller, Delete, Get, Param } from '@nestjs/common'
import { RoleEnum } from 'modules/roles/roles.enum'
import { Roles } from 'modules/roles/roles.decorator'
import { User } from './schemas/user.schema'
import { UsersService } from './users.service'

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiGlobalResponse(ArraySchema, {
    description: 'Get all users | ADMIN only',
    isArray: true,
  })
  @Roles(RoleEnum.ADMIN)
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll()
  }

  @ApiGlobalResponse(User, {
    description: 'Get user by id | ADMIN only',
  })
  @Roles(RoleEnum.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id)
  }

  @ApiGlobalResponse(User, {
    description: 'Delete user by id | ADMIN only',
  })
  @Roles(RoleEnum.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<User> {
    return this.usersService.remove(id)
  }
}
