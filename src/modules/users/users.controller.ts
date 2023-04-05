import { ApiGlobalResponse } from 'common/decorators/api-global-response.decorators'
import { ApiTags } from '@nestjs/swagger'
import { Controller, Delete, Get, Param } from '@nestjs/common'
import { Public } from '../../common/decorators/public.decorator'
import { User } from './schemas/user.schema'
import { UsersService } from './users.service'

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiGlobalResponse(User, {
    description: 'Get all users',
    isArray: true,
  })
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
    description: 'Delete user by id',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<User> {
    return this.usersService.remove(id)
  }
}
