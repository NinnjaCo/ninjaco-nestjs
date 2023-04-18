import { ApiTags } from '@nestjs/swagger'
import { Controller } from '@nestjs/common'

@ApiTags('Course_Management')
@Controller('course-management')
export class CourseManagementController {}
