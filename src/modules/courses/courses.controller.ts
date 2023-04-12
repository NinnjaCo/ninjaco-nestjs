import { ApiGlobalResponse } from 'common/decorators/api-global-response.decorators'
import { ApiTags } from '@nestjs/swagger'
import { ArraySchema } from 'swagger/swagger-primitive-type'
import { Controller, Get } from '@nestjs/common'
import { Course } from './schemas/course.schema'
import { CoursesService } from './courses.service'
import { RoleEnum } from 'modules/roles/roles.enum'
import { Roles } from 'modules/roles/roles.decorator'

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}
  @ApiGlobalResponse(ArraySchema, {
    description: 'Get all users | ADMIN only',
    isArray: true,
  })
  @Roles(RoleEnum.ADMIN, RoleEnum.CREATOR)
  @Get()
  findAll(): string {
    return this.coursesService.findAll()
  }
}
