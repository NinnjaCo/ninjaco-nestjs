import { ApiGlobalResponse } from 'common/decorators/api-global-response.decorators'
import { ApiTags } from '@nestjs/swagger'
import { Body, Controller, Get, Post, Put } from '@nestjs/common'
import { CreateGameProgressDto } from './dto/create-game-progress.dto'
import { GameProgress } from './schemas/game-progress.schema'
import { GamesEnrollmentService } from './games-enrollment.service'
import { UpdateGameProgressDto } from './dto/update-game-progress.dto'

@ApiTags('Games Enrollment')
@Controller('games-enrollment')
export class GamesEnrollmentController {
  constructor(private readonly gamesEnrollmentService: GamesEnrollmentService) {}

  @ApiGlobalResponse(GameProgress, {
    description: 'Create new game progress',
  })
  @Post()
  async createGameProgress(@Body() playDto: CreateGameProgressDto): Promise<GameProgress> {
    return await this.gamesEnrollmentService.createGameProgress(playDto)
  }

  @ApiGlobalResponse(GameProgress, {
    description: 'Get all games and specify whether they are completed or not',
  })
  @Get()
  async getComspletedGames() {
    return await this.gamesEnrollmentService.getCompletedGames()
  }

  @ApiGlobalResponse(GameProgress, {
    description: 'Update game progress',
  })
  @Put(':id')
  async updateGameProgress(@Body() updateDto: UpdateGameProgressDto): Promise<GameProgress> {
    return await this.gamesEnrollmentService.updateGameProgress(updateDto)
  }
}
