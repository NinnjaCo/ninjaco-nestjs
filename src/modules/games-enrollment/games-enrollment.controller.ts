import { ApiGlobalResponse } from 'common/decorators/api-global-response.decorators'
import { ApiTags } from '@nestjs/swagger'
import { Body, Controller, Get, Post, Put } from '@nestjs/common'
import { GameProgress } from './schemas/game-progress.schema'
import { GamesEnrollmentService } from './games-enrollment.service'
import { PlayGameDto } from './dto/play-game.dto'
import { Public } from 'common/decorators/public.decorator'
import { UpdatePlayGameDto } from './dto/update-play-game.dto'

@ApiTags('Games Enrollment')
@Controller('/games-enrollment')
export class GamesEnrollmentController {
  constructor(private readonly gamesEnrollmentService: GamesEnrollmentService) {}

  @ApiGlobalResponse(GameProgress, {
    description: 'Get game progress by user ID',
  })
  @Post()
  async userStartGame(@Body() playDto: PlayGameDto): Promise<GameProgress> {
    return await this.gamesEnrollmentService.userStartGame(playDto)
  }

  @ApiGlobalResponse(GameProgress, {
    description: 'Get all games and specify whether they are completed or not',
  })
  @Get()
  async getComspletedGames() {
    return await this.gamesEnrollmentService.getCompletedGames()
  }

  @Put(':id')
  async updateGameProgress(@Body() updateDto: UpdatePlayGameDto): Promise<GameProgress> {
    return await this.gamesEnrollmentService.updateGameProgress(updateDto)
  }
}
