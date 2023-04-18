import { ApiGlobalResponse } from 'common/decorators/api-global-response.decorators'
import { ApiTags } from '@nestjs/swagger'
import { Body, Controller, Get, Post, Put } from '@nestjs/common'
import { CreateGameProgressDto } from './dto/create-game-progress.dto'
import { GameProgress } from 'modules/usersGameProgress/schema/game-progress.schema'
import { UpdateGameProgressDto } from './dto/update-game-progress.dto'
import { UsersPlayGamesService } from './usersPlayGames.service'

@ApiTags('Users Play Games')
@Controller('users-play-games')
export class UsersPlayGamesController {
  constructor(private readonly userPlayGamesService: UsersPlayGamesService) {}

  @ApiGlobalResponse(GameProgress, {
    description: 'Create new game progress',
  })
  @Post()
  async userPlayGameEntry(@Body() createGameDto: CreateGameProgressDto): Promise<GameProgress> {
    console.log('Dto', createGameDto)
    return await this.userPlayGamesService.createUserPlayGameEntry(createGameDto)
  }

  @ApiGlobalResponse(GameProgress, {
    description: 'Get all games and specify whether they are completed or not',
  })
  @Get()
  async getComspletedGames() {
    return await this.userPlayGamesService.getCompletedGames()
  }

  @ApiGlobalResponse(GameProgress, {
    description: 'Update game progress',
  })
  @Put()
  async updateGameProgress(@Body() updateDto: UpdateGameProgressDto): Promise<GameProgress> {
    return await this.userPlayGamesService.updateGameProgress(updateDto)
  }
}
