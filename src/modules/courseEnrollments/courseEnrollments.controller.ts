import { ApiGlobalResponse } from 'common/decorators/api-global-response.decorators'
import { ApiTags } from '@nestjs/swagger'
import { ArraySchema } from 'swagger/swagger-primitive-type'
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { CourseEnrollment } from './schemas/courseEnrollment.schema'
import { CourseManagementService } from './courseManagement.service'
import { CreateCourseManagementDto } from './dto/create-courseManagement.dto'
import { CreateMissionManagementDto } from './dto/create-missionManagement.dto'
import { LevelManagement } from './schemas/LevelManagement.schema'
import { MissionManagement } from './schemas/MissionManagement.schema'
import { RoleEnum } from 'modules/roles/roles.enum'
import { Roles } from 'modules/roles/roles.decorator'
import { UpdateCourseMangementDto } from './dto/update-courseManagement'
import { UpdateMissionManagementDto } from './dto/update-misionManagement.dto'

@ApiTags('Course-Enrollements')
@Controller('course-enrollements')
export class CourseEnrollmentsController {
  constructor(private readonly courseManagementService: CourseManagementService) {}
  @ApiGlobalResponse(ArraySchema, {
    description: 'Get all courses user enrolled in  ',
    isArray: true,
  })
  @Get()
  findAll(): Promise<CourseEnrollment[]> {
    return this.courseManagementService.findAll()
  }

  @ApiGlobalResponse(CourseEnrollment, {
    description: 'Get course by id ',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<CourseEnrollment> {
    return this.courseManagementService.findCourseById(id)
  }

  @ApiGlobalResponse(CourseEnrollment, {
    description: 'Delete course by id | ADMIN and creator only',
  })
  @Roles(RoleEnum.ADMIN, RoleEnum.CREATOR)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<CourseEnrollment> {
    return this.courseManagementService.deleteCourse(id)
  }

  @ApiGlobalResponse(CourseEnrollment, {
    description: 'Update course information | ADMIN and creator only',
  })
  @Roles(RoleEnum.ADMIN, RoleEnum.CREATOR)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() courseMnagementDto: UpdateCourseMangementDto
  ): Promise<CourseEnrollment> {
    return this.courseManagementService.updateCourse(id, courseMnagementDto)
  }

  @ApiGlobalResponse(CourseEnrollment, {
    description: 'Create new course | ADMIN and creator only',
  })
  @Roles(RoleEnum.ADMIN, RoleEnum.CREATOR)
  @Post()
  create(@Body() courseMnagementDto: CreateCourseManagementDto): Promise<CourseEnrollment> {
    return this.courseManagementService.createCourse(courseMnagementDto)
  }

  // mission management crud
  @ApiGlobalResponse(ArraySchema, {
    description: 'Update mission progress | ADMIN and creator only',
  })
  @Roles(RoleEnum.ADMIN, RoleEnum.CREATOR)
  @Put(':id/mission/:missionId')
  updateMissionProgress(
    @Param('id') id: string,
    @Param('missionId') missionId: string,
    @Body() missionMnagementDto: UpdateMissionManagementDto
  ): Promise<MissionManagement> {
    return this.courseManagementService.updateMissionProgress(id, missionId, missionMnagementDto)
  }

  @ApiGlobalResponse(MissionManagement, {
    description: 'Create mission progress | ADMIN and creator only',
  })
  @Roles(RoleEnum.ADMIN, RoleEnum.CREATOR)
  @Post(':id/mission')
  createMissionProgress(
    @Param('id') id: string,
    @Param('missionId') missionId: string,
    @Body() missionManagementDto: CreateMissionManagementDto
  ): Promise<MissionManagement> {
    return this.courseManagementService.createMissionProgress(id, missionId, missionManagementDto)
  }

  @ApiGlobalResponse(MissionManagement, {
    description: 'Delete mission progress | ADMIN and creator only',
  })
  @Roles(RoleEnum.ADMIN, RoleEnum.CREATOR)
  @Delete(':id/mission/:missionId')
  deleteMissionProgress(
    @Param('id') id: string,
    @Param('missionId') missionId: string
  ): Promise<MissionManagement> {
    return this.courseManagementService.deleteMissionProgress(id, missionId)
  }

  @ApiGlobalResponse(MissionManagement, {
    description: 'Get all mssions user enrolled in  ',
    isArray: true,
  })
  @Get(':id/mission')
  findAllMissions(@Param('userId') userId: string): Promise<MissionManagement[]> {
    return this.courseManagementService.findAllMissions(userId)
  }

  @ApiGlobalResponse(MissionManagement, {
    description: 'Get a mssion user enrolled in  ',
  })
  @Get(':id/mission/:missionId')
  findMission(
    @Param('userId') userId: string,
    @Param('missionId') missionId: string
  ): Promise<MissionManagement> {
    return this.courseManagementService.findMission(userId, missionId)
  }
}
