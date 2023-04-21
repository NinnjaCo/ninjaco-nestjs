import { ApiGlobalResponse } from '../../common/decorators/api-global-response.decorators'
import { ApiTags } from '@nestjs/swagger'
import { ArraySchema } from '../../swagger/swagger-primitive-type'
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { CreateLevelProgressDto } from './dto/create-levelProgress.dto'
import { LevelProgress } from './schema/LevelProgress.schema'
import { RoleEnum } from '../roles/roles.enum'
import { Roles } from '../roles/roles.decorator'
import { UpdateLevelProgressDto } from './dto/update-levelProgress.dto'
import { UsersLevelsProgressService } from './usersLevelsProgress.service'

@ApiTags('Users Levels Progress')
@Controller('users-levels-progress')
export class UsersLevelsProgressController {
  constructor(private readonly levelProgressService: UsersLevelsProgressService) {}
  @ApiGlobalResponse(ArraySchema, {
    description: 'Get all levelProgress ',
    isArray: true,
  })
  @Get()
  findAll(): Promise<LevelProgress[]> {
    return this.levelProgressService.findAll()
  }

  @ApiGlobalResponse(ArraySchema, {
    description: 'Get a  levelProgress with id ',
    isArray: true,
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<LevelProgress> {
    return this.levelProgressService.findLevelProgressById(id)
  }

  @ApiGlobalResponse(LevelProgress, {
    description: 'Delete LevelProgress by id | ADMIN and creator only',
  })
  @Roles(RoleEnum.ADMIN, RoleEnum.CREATOR)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<LevelProgress> {
    return this.levelProgressService.deleteCourse(id)
  }

  @ApiGlobalResponse(LevelProgress, {
    description: 'Update LevelProgress | ADMIN and creator only',
  })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() progressDto: UpdateLevelProgressDto
  ): Promise<LevelProgress> {
    return this.levelProgressService.updateLevelProgress(id, progressDto)
  }

  @ApiGlobalResponse(LevelProgress, {
    description: 'Create newLevelProgress | ADMIN and creator only',
  })
  @Roles(RoleEnum.ADMIN, RoleEnum.CREATOR)
  @Post()
  create(@Body() levelDto: CreateLevelProgressDto): Promise<LevelProgress> {
    return this.levelProgressService.createLevelProgress(levelDto)
  }
}
