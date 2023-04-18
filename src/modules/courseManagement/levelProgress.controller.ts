import { ApiGlobalResponse } from 'common/decorators/api-global-response.decorators'
import { ApiTags } from '@nestjs/swagger'
import { ArraySchema } from 'swagger/swagger-primitive-type'
import { Controller, Get, Param } from '@nestjs/common'
import { Course } from 'modules/courses/schemas/course.schema'
import { LevelProgress } from './schemas/LevelProgress.schema'
import { LevelProgressService } from './levelProgress.service'

@ApiTags('LeveLProgress')
@Controller('levelProgress')
export class LevelProgressController {
  constructor(private readonly levelProgressService: LevelProgressService) {}
  @ApiGlobalResponse(ArraySchema, {
    description: 'Get all levelProgress ',
    isArray: true,
  })
  @Get()
  findAll(): Promise<LevelProgress[]> {
    return this.levelProgressService.findAll()
  }

  @ApiGlobalResponse(ArraySchema, {
    description: 'Get a  levelProgress with id ',
    isArray: true,
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<LevelProgress> {
    return this.levelProgressService.findLevelProgressById(id)
  }
}
