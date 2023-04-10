import { ApiGlobalResponse } from 'common/decorators/api-global-response.decorators'
import { ApiTags } from '@nestjs/swagger'
import { ArraySchema } from 'swagger/swagger-primitive-type'
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { CreateUsersDto } from './dto/create-user.dto'
import { RoleEnum } from 'modules/roles/roles.enum'
import { Roles } from 'modules/roles/roles.decorator'
import { UpdateUserDto } from './dto/update-user.dto'
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
    description: 'Get user by id',
  })
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

  @ApiGlobalResponse(User, {
    description: 'Update user information',
  })
  @Put(':id')
  update(@Param('id') id: string, @Body() userDto: UpdateUserDto): Promise<User> {
    return this.usersService.update(id, userDto)
  }

  @ApiGlobalResponse(User, {
    description: 'Create new user or creator | ADMIN only',
  })
  @Roles(RoleEnum.ADMIN)
  @Post()
  create(@Body() userDto: CreateUsersDto): Promise<User> {
    console.log('userdto:', userDto)
    console.log('userdtoRole:', userDto.role)
    return this.usersService.create(userDto)
  }
}
