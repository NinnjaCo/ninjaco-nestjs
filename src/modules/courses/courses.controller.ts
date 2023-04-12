import { ApiGlobalResponse } from 'common/decorators/api-global-response.decorators'
import { ApiTags } from '@nestjs/swagger'
import { ArraySchema } from 'swagger/swagger-primitive-type'
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { Course } from './schemas/course.schema'
import { CoursesService } from './courses.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { CreateCourseDto } from './dto/create-course.dto'
import { CreateMissionDto } from './dto/create-mission.dto'
import { Mission } from './schemas/mission.schema'
import { RoleEnum } from 'modules/roles/roles.enum'
import { Roles } from 'modules/roles/roles.decorator'
import { UpdateCourseDto } from './dto/update-course.dto'

import { UpdateMissionDto } from './dto/update-mission.dto'

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}
  @ApiGlobalResponse(ArraySchema, {
    description: 'Get all courses ',
    isArray: true,
  })
  @Get()
  findAll(): Promise<Course[]> {
    return this.coursesService.findAll()
  }
  @ApiGlobalResponse(Course, {
    description: 'Get course by id',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Course> {
    return this.coursesService.findCourseById(id)
  }

  @ApiGlobalResponse(Course, {
    description: 'Delete course by id | ADMIN and creator only',
  })
  @Roles(RoleEnum.ADMIN, RoleEnum.CREATOR)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Course> {
    return this.coursesService.deleteCourse(id)
  }

  @ApiGlobalResponse(Course, {
    description: 'Update course information | ADMIN and creator only',
  })
  @Roles(RoleEnum.ADMIN, RoleEnum.CREATOR)
  @Put(':id')
  update(@Param('id') id: string, @Body() courseDto: UpdateCourseDto): Promise<Course> {
    return this.coursesService.updateCourse(id, courseDto)
  }

  @ApiGlobalResponse(Course, {
    description: 'Create new course | ADMIN and creator only',
  })
  @Roles(RoleEnum.ADMIN, RoleEnum.CREATOR)
  @Post()
  create(@Body() courseDto: CreateCourseDto): Promise<Course> {
    return this.coursesService.createCourse(courseDto)
  }

  @ApiGlobalResponse(ArraySchema, {
    description: 'Get all missions of a course ',
    isArray: true,
  })
  @Get(':id/missions')
  findAllMissions(@Param('id') id: string): Promise<Mission[]> {
    return this.coursesService.findAllMissions(id)
  }

  @ApiGlobalResponse(Mission, {
    description: 'Get mission by id',
  })
  @Get(':id/missions/:missionId')
  findOneMission(@Param('id') id: string, @Param('missionId') missionId: string): Promise<Mission> {
    return this.coursesService.findMissionById(id, missionId)
  }

  @ApiGlobalResponse(Mission, {
    description: 'Update new mission | ADMIN and creator only',
  })
  @Roles(RoleEnum.ADMIN, RoleEnum.CREATOR)
  @Put(':id/missions/:missionId')
  updateMission(
    @Param('id') id: string,
    @Param('missionId') missionId: string,
    @Body() missionDto: UpdateMissionDto
  ): Promise<Mission> {
    return this.coursesService.updateMission(id, missionId, missionDto)
  }

  @ApiGlobalResponse(Mission, {
    description: 'Delete new mission | ADMIN and creator only',
  })
  @Roles(RoleEnum.ADMIN, RoleEnum.CREATOR)
  @Delete(':id/missions/:missionId')
  removeMission(@Param('id') id: string, @Param('missionId') missionId: string): Promise<Mission> {
    return this.coursesService.deleteMission(id, missionId)
  }
}
