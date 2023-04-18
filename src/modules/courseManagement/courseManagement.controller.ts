import { ApiGlobalResponse } from 'common/decorators/api-global-response.decorators'
import { ApiTags } from '@nestjs/swagger'
import { ArraySchema } from 'swagger/swagger-primitive-type'
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { CourseManagementService } from './courseManagement.service'
import { CreateCourseManagementDto } from './dto/create-courseManagement.dto'
import { CreateMissionManagementDto } from './dto/create-missionManagement.dto'
import { RoleEnum } from 'modules/roles/roles.enum'
import { Roles } from 'modules/roles/roles.decorator'
import { UpdateCourseMangementDto } from './dto/update-courseManagement'
import { UpdateMissionManagementDto } from './dto/update-misionManagement.dto'
import { User_enroll_course } from './schemas/User_enroll_course.schema'

@ApiTags('Course_Management')
@Controller('course-management')
export class CourseManagementController {
  constructor(private readonly courseManagementService: CourseManagementService) {}
  @ApiGlobalResponse(ArraySchema, {
    description: 'Get all courses user enrolled in  ',
    isArray: true,
  })
  @Get()
  findAll(): Promise<User_enroll_course[]> {
    return this.courseManagementService.findAll()
  }

  @ApiGlobalResponse(User_enroll_course, {
    description: 'Get course by id ',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User_enroll_course> {
    return this.courseManagementService.findCourseById(id)
  }

  @ApiGlobalResponse(User_enroll_course, {
    description: 'Delete course by id | ADMIN and creator only',
  })
  @Roles(RoleEnum.ADMIN, RoleEnum.CREATOR)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<User_enroll_course> {
    return this.courseManagementService.deleteCourse(id)
  }

  @ApiGlobalResponse(User_enroll_course, {
    description: 'Update course information | ADMIN and creator only',
  })
  @Roles(RoleEnum.ADMIN, RoleEnum.CREATOR)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() courseMnagementDto: UpdateCourseMangementDto
  ): Promise<User_enroll_course> {
    return this.courseManagementService.updateCourse(id, courseMnagementDto)
  }

  @ApiGlobalResponse(User_enroll_course, {
    description: 'Create new course | ADMIN and creator only',
  })
  @Roles(RoleEnum.ADMIN, RoleEnum.CREATOR)
  @Post()
  create(@Body() courseMnagementDto: CreateCourseManagementDto): Promise<User_enroll_course> {
    return this.courseManagementService.createCourse(courseMnagementDto)
  }

  // for the mission progress
  @ApiGlobalResponse(User_enroll_course, {
    description: 'Update mission progress | ADMIN and creator only',
  })
  @Roles(RoleEnum.ADMIN, RoleEnum.CREATOR)
  @Put(':id/mission/:missionId')
  updateMissionProgress(
    @Param('id') id: string,
    @Param('missionId') missionId: string,
    @Body() missionMnagementDto: UpdateMissionManagementDto
  ): Promise<User_enroll_course> {
    return this.courseManagementService.updateMissionProgress(id, missionId, missionMnagementDto)
  }

  @ApiGlobalResponse(User_enroll_course, {
    description: 'Create mission progress | ADMIN and creator only',
  })
  @Roles(RoleEnum.ADMIN, RoleEnum.CREATOR)
  @Post(':id/mission/:missionId')
  createMissionProgress(
    @Param('id') id: string,
    @Param('missionId') missionId: string,
    @Body() missionManagementDto: CreateMissionManagementDto
  ): Promise<User_enroll_course> {
    return this.courseManagementService.createMissionProgress(id, missionId, missionManagementDto)
  }

  @ApiGlobalResponse(User_enroll_course, {
    description: 'Delete mission progress | ADMIN and creator only',
  })
  @Roles(RoleEnum.ADMIN, RoleEnum.CREATOR)
  @Delete(':id/mission/:missionId')
  deleteMissionProgress(
    @Param('id') id: string,
    @Param('missionId') missionId: string
  ): Promise<User_enroll_course> {
    return this.courseManagementService.deleteMissionProgress(id, missionId)
  }

  @ApiGlobalResponse(User_enroll_course, {
    description: 'Get all mssions user enrolled in  ',
    isArray: true,
  })
  @Get(':id/mission')
  findAllByUserId(@Param('userId') userId: string): Promise<User_enroll_course[]> {
    return this.courseManagementService.findAllByUserId(userId)
  }

  @ApiGlobalResponse(User_enroll_course, {
    description: 'Get a mssion user enrolled in  ',
  })
  @Get(':id/mission/:missionId')
  findMissionByUserId(
    @Param('userId') userId: string,
    @Param('missionId') missionId: string
  ): Promise<User_enroll_course> {
    return this.courseManagementService.findMissionByUserId(userId, missionId)
  }
}
