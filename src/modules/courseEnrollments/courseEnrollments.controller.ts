import { ApiGlobalResponse } from 'common/decorators/api-global-response.decorators'
import { ApiTags } from '@nestjs/swagger'
import { ArraySchema } from 'swagger/swagger-primitive-type'
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { Course } from 'modules/courses/schemas/course.schema'
import { CourseEnrollment } from './schemas/courseEnrollment.schema'
import { CourseEnrollmentsService } from './courseEnrollments.service'
import { CreateCourseManagementDto } from './dto/create-courseManagement.dto'
import { CreateMissionManagementDto } from './dto/create-missionManagement.dto'
import { MissionManagement } from './schemas/MissionManagement.schema'
import { UpdateCourseMangementDto } from './dto/update-courseManagement'
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
  findAllCourses(userId: string): Promise<Course[] | CourseEnrollment[]> {
    return this.CourseEnrollmentService.findAllCourses(userId)
  }

  @ApiGlobalResponse(CourseEnrollment, {
    description: 'Get course by id ',
  })
  @Get(':id')
  findOne(@Param('id') id: string, userId: string): Promise<CourseEnrollment> {
    return this.CourseEnrollmentService.findCourseById(id, userId)
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
  @Post(':courseId')
  create(
    @Param('courseId') courseId: string,
    @Body() courseMnagementDto: CreateCourseManagementDto
  ): Promise<CourseEnrollment> {
    return this.CourseEnrollmentService.createCourseEnrollement(courseMnagementDto, courseId)
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

  // @ApiGlobalResponse(MissionManagement, {
  //   description: 'Create mission progress ',
  // })
  // @Post(':id/mission')
  // createMissionProgress(
  //   @Param('id') courseId: string,
  //   @Param('missionId') missionId: string,
  //   @Body() missionManagementDto: CreateMissionManagementDto
  // ): Promise<MissionManagement> {
  //   return this.CourseEnrollmentService.createMissionProgress(
  //     courseId,
  //     missionId,
  //     missionManagementDto
  //   )
  // }

  @ApiGlobalResponse(MissionManagement, {
    description: 'Get all mssions user enrolled in   ',
    isArray: true,
  })
  @Get(':id')
  findAllMissions(@Param('id') courseId: string, userId: string): Promise<MissionManagement[]> {
    return this.CourseEnrollmentService.findAllMissions(userId, courseId)
  }

  @ApiGlobalResponse(MissionManagement, {
    description: 'Get a mssion user enrolled in  ',
  })
  @Get(':id/:missionId')
  findMissionById(
    @Param('userId') userId: string,
    @Param('missionId') missionId: string,
    courseId: string
  ): Promise<MissionManagement> {
    return this.CourseEnrollmentService.findMissionById(userId, missionId, courseId)
  }
}
