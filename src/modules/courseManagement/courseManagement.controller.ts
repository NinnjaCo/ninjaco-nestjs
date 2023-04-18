import { ApiGlobalResponse } from 'common/decorators/api-global-response.decorators'
import { ApiTags } from '@nestjs/swagger'
import { ArraySchema } from 'swagger/swagger-primitive-type'
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { CourseManagementService } from './courseManagement.service'
import { CreateCourseManagementDto } from './dto/create-courseManagement.dto'
import { RoleEnum } from 'modules/roles/roles.enum'
import { Roles } from 'modules/roles/roles.decorator'
import { UpdateCourseMangementDto } from './dto/update-courseManagement'
import { User_enroll_course } from './schemas/User_enroll_course.schema'

@ApiTags('Course_Management')
@Controller('course-management')
export class CourseManagementController {
  constructor(private readonly courseManagementService: CourseManagementService) {}
  @ApiGlobalResponse(ArraySchema, {
    description: 'Get all courses user enrolled in | ADMIN and creator only ',
    isArray: true,
  })
  @Roles(RoleEnum.ADMIN, RoleEnum.CREATOR)
  @Get()
  findAll(): Promise<User_enroll_course[]> {
    return this.courseManagementService.findAll()
  }

  @ApiGlobalResponse(User_enroll_course, {
    description: 'Get course by id | ADMIN and creator only',
  })
  @Roles(RoleEnum.ADMIN, RoleEnum.CREATOR)
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
}
