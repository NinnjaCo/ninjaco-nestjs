import { ApiGlobalResponse } from 'common/decorators/api-global-response.decorators'
import { ApiTags } from '@nestjs/swagger'
import { ArraySchema } from 'swagger/swagger-primitive-type'
import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common'
import { Course } from 'modules/courses/schemas/course.schema'
import { LevelProgress } from './schemas/LevelProgress.schema'
import { LevelProgressService } from './levelProgress.service'
import { RoleEnum } from 'modules/roles/roles.enum'
import { Roles } from 'modules/roles/roles.decorator'
import { UpdateCourseDto } from 'modules/courses/dto/update-course.dto'
import { UpdateLevelProgressDto } from './dto/update-levelProgress.dto'

@ApiTags('LeveLProgress')
@Controller('levelProgress')
export class LevelProgressController {
  constructor(private readonly levelProgressService: LevelProgressService) {}
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

  @ApiGlobalResponse(Course, {
    description: 'Update LevelProgress | ADMIN and creator only',
  })
  @Roles(RoleEnum.ADMIN, RoleEnum.CREATOR)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() progressDto: UpdateLevelProgressDto
  ): Promise<LevelProgress> {
    return this.levelProgressService.updateCourse(id, progressDto)
  }
}
