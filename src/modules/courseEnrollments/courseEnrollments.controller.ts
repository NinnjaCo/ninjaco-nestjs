import { ApiGlobalResponse } from 'common/decorators/api-global-response.decorators'
import { ApiTags } from '@nestjs/swagger'
import { ArraySchema } from 'swagger/swagger-primitive-type'
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { Course } from 'modules/courses/schemas/course.schema'
import { CourseEnrollment } from './schemas/courseEnrollment.schema'
import { CourseEnrollmentsService } from './courseEnrollments.service'
import { CreateCourseManagementDto } from './dto/create-courseManagement.dto'
import { CreateLevelManagementDto } from './dto/create-levelManagagement.dto'
import { CreateMissionManagementDto } from './dto/create-missionManagement.dto'
import { Level } from 'modules/courses/schemas/level.schema'
import { LevelManagement } from './schemas/LevelManagement.schema'
import { Mission } from 'modules/courses/schemas/mission.schema'
import { MissionManagement } from './schemas/MissionManagement.schema'

import { UpdateCourseMangementDto } from './dto/update-courseManagement'
import { UpdateLevelManagementDto } from './dto/update-levelManagement.dto'
import { UpdateMissionManagementDto } from './dto/update-misionManagement.dto'

@ApiTags('Course-Enrollements')
@Controller('course-enrollements')
export class CourseEnrollmentsController {
  constructor(private readonly CourseEnrollmentService: CourseEnrollmentsService) {}
  @ApiGlobalResponse(ArraySchema, {
    description: 'Get all courses user enrolled in  ',
    isArray: true,
  })
  @Get()
  findAllCourses(@Body() body): Promise<(Course | CourseEnrollment)[]> {
    const userId = body.userId
    return this.CourseEnrollmentService.findAllCourses(userId)
  }

  @ApiGlobalResponse(CourseEnrollment, {
    description: 'Get course by id ',
  })
  @Get(':courseId')
  findOne(@Param('courseId') courseId: string, @Body() body): Promise<CourseEnrollment | Course> {
    const userId = body.userId
    return this.CourseEnrollmentService.findCourseById(courseId, userId)
  }

  @ApiGlobalResponse(CourseEnrollment, {
    description: 'Delete course by id ',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<CourseEnrollment> {
    return this.CourseEnrollmentService.deleteCourse(id)
  }

  // @ApiGlobalResponse(CourseEnrollment, {
  //   description: 'Update course information',
  // })
  // @Put(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() courseMnagementDto: UpdateCourseMangementDto
  // ): Promise<Course> {
  //   return this.CourseEnrollmentService.updateCourse(id, courseMnagementDto)
  // }

  @ApiGlobalResponse(CourseEnrollment, {
    description: 'Create new course enrollment ',
  })
  @Post()
  create(@Body() courseMnagementDto: CreateCourseManagementDto): Promise<CourseEnrollment> {
    return this.CourseEnrollmentService.createCourseEnrollement(courseMnagementDto)
  }

  //   // mission management crud
  //   @ApiGlobalResponse(ArraySchema, {
  //     description: 'Update mission progress ',
  //   })
  //   @Put(':id/mission/:missionId')
  //   updateMissionProgress(
  //     @Param('id') id: string,
  //     @Param('missionId') missionId: string,
  //     @Body() missionMnagementDto: UpdateMissionManagementDto
  //   ): Promise<MissionManagement> {
  //     return this.courseManagementService.updateMissionProgress(id, missionId, missionMnagementDto)
  //   }

  @ApiGlobalResponse(MissionManagement, {
    description: 'Create mission progress ',
  })
  @Post('/missions')
  createMissionProgress(
    @Body() createMissionProgress: CreateMissionManagementDto
  ): Promise<MissionManagement> {
    return this.CourseEnrollmentService.createMissionProgress(createMissionProgress)
  }

  @ApiGlobalResponse(ArraySchema, {
    description: 'Get all mssions user enrolled in   ',
    isArray: true,
  })
  @Get(':id')
  findAllMissions(
    @Param('id') courseId: string,
    userId: string
  ): Promise<(MissionManagement | Mission)[]> {
    return this.CourseEnrollmentService.findAllMissions(userId, courseId)
  }

  @ApiGlobalResponse(MissionManagement, {
    description: 'Get a mssion user enrolled in  ',
  })
  @Get(':id/missions/:missionId')
  findMissionById(
    @Param('missionId') missionId: string,
    @Param('id') courseId: string,
    @Body() body
  ): Promise<MissionManagement> {
    const userId = body.userId
    return this.CourseEnrollmentService.findMissionById(missionId, courseId, userId)
  }

  //level crud
  @ApiGlobalResponse(ArraySchema, {
    description: 'Get all levels user enrolled in   ',
    isArray: true,
  })
  @Get(':id/:missionId')
  findAllLevels(
    @Param('id') courseId: string,
    userId: string,
    @Param('missionId') missionId: string
  ): Promise<(Level | LevelManagement)[]> {
    return this.CourseEnrollmentService.findAllLevels(userId, courseId, missionId)
  }

  @ApiGlobalResponse(LevelManagement, {
    description: 'get level by id| ADMIN and creator only',
  })
  @Get(':id/:missionId/:levelId')
  findLevelById(
    @Param('id') courseId: string,
    @Param('missionId') missionId: string,
    @Param('levelId') levelId: string,
    @Body() body
  ): Promise<LevelManagement> {
    const userId = body.userId
    return this.CourseEnrollmentService.findLevelById(userId, courseId, missionId, levelId)
  }

  @ApiGlobalResponse(LevelManagement, {
    description: 'Create level progress ',
  })
  @Post('/missions/levels')
  createLevelProgress(
    @Body() createLevelProgress: CreateLevelManagementDto
  ): Promise<LevelManagement> {
    return this.CourseEnrollmentService.createLevelProgress(createLevelProgress)
  }

  @ApiGlobalResponse(LevelManagement, {
    description: 'Update level progress ',
  })
  @Put('/missions/levels')
  updateProgress(
    @Body() levelManagmentDto: UpdateLevelManagementDto,
    missionManagementDto: UpdateMissionManagementDto,
    courseManagementDto: UpdateCourseMangementDto
  ): Promise<CourseEnrollment> {
    return this.CourseEnrollmentService.updateProgress(
      levelManagmentDto,
      missionManagementDto,
      courseManagementDto
    )
  }
}
