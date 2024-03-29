import { ApiGlobalResponse } from '../../common/decorators/api-global-response.decorators'
import { ApiTags } from '@nestjs/swagger'
import { ArraySchema } from '../../swagger/swagger-primitive-type'
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { Course } from './schemas/course.schema'
import { CoursesService } from './courses.service'
import { CreateCourseDto } from './dto/create-course.dto'
import { CreateLevelDto } from './dto/create-level.dto'
import { CreateMissionDto } from './dto/create-mission.dto'
import { Level } from './schemas/level.schema'
import { Mission } from './schemas/mission.schema'
import { RoleEnum } from '../roles/roles.enum'
import { Roles } from '../roles/roles.decorator'
import { UpdateCourseDto } from './dto/update-course.dto'
import { UpdateLevelDto } from './dto/update-level.dto'
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

  @ApiGlobalResponse(Mission, {
    description: 'Create new mission | ADMIN and creator only',
  })
  @Roles(RoleEnum.ADMIN, RoleEnum.CREATOR)
  @Post(':id/missions')
  createMission(@Param('id') id: string, @Body() missionDto: CreateMissionDto): Promise<Mission> {
    return this.coursesService.createMission(id, missionDto)
  }

  //create CRUD for the levels inside the missions
  //change them
  @ApiGlobalResponse(ArraySchema, {
    description: 'Get all levels of a mission ',
    isArray: true,
  })
  @Get(':id/missions/:missionId/levels')
  findAllLevels(@Param('id') id: string, @Param('missionId') missionId: string): Promise<Level[]> {
    return this.coursesService.findAllLevels(id, missionId)
  }

  @ApiGlobalResponse(ArraySchema, {
    description: 'Get a level within a course ',
  })
  @Get(':id/missions/:missionId/levels/:levelId')
  findOneLevel(
    @Param('id') id: string,
    @Param('missionId') missionId: string,
    @Param('levelId') levelId: string
  ): Promise<Level> {
    return this.coursesService.findLevelById(id, missionId, levelId)
  }

  @ApiGlobalResponse(ArraySchema, {
    description: 'Update a level within a course | ADMIN and creator only',
  })
  @Roles(RoleEnum.ADMIN, RoleEnum.CREATOR)
  @Put(':id/missions/:missionId/levels/:levelId')
  updateLevel(
    @Param('id') id: string,
    @Param('missionId') missionId: string,
    @Param('levelId') levelId: string,
    @Body() levelDto: UpdateLevelDto
  ): Promise<Level> {
    return this.coursesService.updateLevel(id, missionId, levelId, levelDto)
  }

  @ApiGlobalResponse(ArraySchema, {
    description: 'Delete a level within a course | ADMIN and creator only',
  })
  @Roles(RoleEnum.ADMIN, RoleEnum.CREATOR)
  @Delete(':id/missions/:missionId/levels/:levelId')
  removeLevel(
    @Param('id') id: string,
    @Param('missionId') missionId: string,
    @Param('levelId') levelId: string
  ): Promise<Level> {
    return this.coursesService.deleteLevel(id, missionId, levelId)
  }

  @ApiGlobalResponse(ArraySchema, {
    description: 'Create a level within a course | ADMIN and creator only',
  })
  @Roles(RoleEnum.ADMIN, RoleEnum.CREATOR)
  @Post(':id/missions/:missionId/levels')
  createLevel(
    @Param('id') id: string,
    @Param('missionId') missionId: string,
    @Body() levelDto: CreateLevelDto
  ): Promise<Level> {
    return this.coursesService.createLevel(id, missionId, levelDto)
  }
}
