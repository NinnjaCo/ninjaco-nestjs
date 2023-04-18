import { ApiGlobalResponse } from 'common/decorators/api-global-response.decorators'
import { ApiTags } from '@nestjs/swagger'
import { ArraySchema } from 'swagger/swagger-primitive-type'
import { Controller, Get } from '@nestjs/common'
import { Course } from 'modules/courses/schemas/course.schema'

@ApiTags('LeveLProgress')
@Controller('levelProgress')
export class LevelProgressController {
  @ApiGlobalResponse(ArraySchema, {
    description: 'Get all levelProgress ',
    isArray: true,
  })
  @Get()
  findAll(): string {
    return 'helo'
  }
}
