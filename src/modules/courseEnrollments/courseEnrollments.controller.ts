import { ApiGlobalResponse } from '../../common/decorators/api-global-response.decorators'
import { ApiTags } from '@nestjs/swagger'
import { ArraySchema } from '../../swagger/swagger-primitive-type'
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { Course } from '../courses/schemas/course.schema'
import { CourseEnrollment } from './schemas/courseEnrollment.schema'
import { CourseEnrollmentsService } from './courseEnrollments.service'
import { CreateCourseManagementDto } from './dto/create-courseManagement.dto'
import { CreateLevelManagementDto } from './dto/create-levelManagagement.dto'
import { CreateMissionManagementDto } from './dto/create-missionManagement.dto'
import { GetCurrentUserId } from '../../common/decorators/get-current-user-id.decorator'
import { Level } from '../courses/schemas/level.schema'
import { LevelManagement } from './schemas/LevelManagement.schema'
import { Mission } from '../courses/schemas/mission.schema'
import { MissionManagement } from './schemas/MissionManagement.schema'
import { UpdateCourseMangementDto } from './dto/update-courseManagement'
import { UpdateLevelManagementDto } from './dto/update-levelManagement.dto'
import { UpdateMissionManagementDto } from './dto/update-misionManagement.dto'

@ApiTags('Course-Enrollements')
@Controller('course-enrollements')
export class CourseEnrollmentsController {
  constructor(private readonly CourseEnrollmentService: CourseEnrollmentsService) {}

  @ApiGlobalResponse(ArraySchema, {
    description:
      'Get all courses, if user is enrolled in course, return course enrollment otherwise return course',
    isArray: true,
  })
  @Get()
  findAllCourses(@GetCurrentUserId() userId: string): Promise<(Course | CourseEnrollment)[]> {
    return this.CourseEnrollmentService.findAllCourses(userId)
  }

  @ApiGlobalResponse(CourseEnrollment, {
    description: 'Get course by id ',
  })
  @Get(':courseId')
  findOne(
    @Param('courseId') courseId: string,
    @GetCurrentUserId() userId: string
  ): Promise<CourseEnrollment | Course> {
    return this.CourseEnrollmentService.findCourseById(courseId, userId)
  }

  @ApiGlobalResponse(CourseEnrollment, {
    description: 'Delete course enrollment for a user given the course id and user id',
  })
  @Delete(':courseId')
  remove(
    @Param('courseId') courseId: string,
    @GetCurrentUserId() userId: string
  ): Promise<CourseEnrollment> {
    return this.CourseEnrollmentService.deleteCourse(courseId, userId)
  }

  @ApiGlobalResponse(CourseEnrollment, {
    description: 'Create new course enrollment for a user given the course id and user id',
  })
  @Post()
  create(
    @GetCurrentUserId() userId: string,
    @Body() courseMnagementDto: CreateCourseManagementDto
  ): Promise<CourseEnrollment> {
    return this.CourseEnrollmentService.createCourseEnrollement(userId, courseMnagementDto)
  }

  @ApiGlobalResponse(MissionManagement, {
    description:
      'Create mission progress in a course enrollment for a user given the course id and user id and mission id',
  })
  @Post(':courseId/missions')
  createMissionProgress(
    @Param('courseId') courseId: string,
    @GetCurrentUserId() userId: string,
    @Body() createMissionProgressDto: CreateMissionManagementDto
  ): Promise<MissionManagement> {
    return this.CourseEnrollmentService.createMissionProgress(
      userId,
      courseId,
      createMissionProgressDto
    )
  }

  @ApiGlobalResponse(ArraySchema, {
    description: 'Get all mssions user enrolled in   ',
    isArray: true,
  })
  @Get(':courseId/missions')
  findAllMissions(
    @Param('courseId') courseId: string,
    @GetCurrentUserId() userId: string
  ): Promise<(MissionManagement | Mission)[]> {
    return this.CourseEnrollmentService.findAllMissions(userId, courseId)
  }

  @ApiGlobalResponse(MissionManagement, {
    description: 'Get a mission user enrolled in  ',
  })
  @Get(':courseId/missions/:missionId')
  findMissionById(
    @Param('courseId') courseId: string,
    @Param('missionId') missionId: string,
    @GetCurrentUserId() userId: string
  ): Promise<MissionManagement | Mission> {
    return this.CourseEnrollmentService.findMissionById(missionId, courseId, userId)
  }

  //level crud
  @ApiGlobalResponse(ArraySchema, {
    description: 'Get all levels user enrolled in   ',
    isArray: true,
  })
  @Get(':courseId/missions/:missionId/levels')
  findAllLevels(
    @Param('courseId') courseId: string,
    @Param('missionId') missionId: string,
    @GetCurrentUserId() userId: string
  ): Promise<(Level | LevelManagement)[]> {
    return this.CourseEnrollmentService.findAllLevels(courseId, userId, missionId)
  }

  @ApiGlobalResponse(LevelManagement, {
    description: 'Get level by id',
  })
  @Get(':courseId/missions/:missionId/levels/:levelId')
  findLevelById(
    @Param('courseId') courseId: string,
    @Param('missionId') missionId: string,
    @Param('levelId') levelId: string,
    @GetCurrentUserId() userId: string
  ): Promise<LevelManagement> {
    return this.CourseEnrollmentService.findLevelById(userId, courseId, missionId, levelId)
  }

  @ApiGlobalResponse(LevelManagement, {
    description: 'Create level progress ',
  })
  @Post(':courseId/missions/:missionId/levels')
  createLevelProgress(
    @Param('courseId') courseId: string,
    @Param('missionId') missionId: string,
    @GetCurrentUserId() userId: string,
    @Body() createLevelProgress: CreateLevelManagementDto
  ): Promise<LevelManagement> {
    return this.CourseEnrollmentService.createLevelProgress(
      userId,
      courseId,
      missionId,
      createLevelProgress
    )
  }

  @ApiGlobalResponse(LevelManagement, {
    description: 'Update level progress ',
  })
  @Put(':courseId/missions/:missionId/levels/:levelId')
  updateProgress(
    @Param('courseId') courseId: string,
    @Param('missionId') missionId: string,
    @Param('levelId') levelId: string,
    @GetCurrentUserId() userId: string,
    @Body() updateLevelProgress: UpdateLevelManagementDto
  ): Promise<CourseEnrollment> {
    return this.CourseEnrollmentService.updateLevel(
      userId,
      courseId,
      missionId,
      levelId,
      updateLevelProgress
    )
  }
}
