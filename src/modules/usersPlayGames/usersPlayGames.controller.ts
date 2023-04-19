import { ApiGlobalResponse } from 'common/decorators/api-global-response.decorators'
import { ApiTags } from '@nestjs/swagger'
import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common'
import { CreateUserPlayGameDto } from './dto/create-game-progress.dto'
import { GameProgress } from 'modules/usersGameProgress/schema/game-progress.schema'
import { UpdateUserPlayGameDto } from './dto/update-user-play-game.dto'
import { UserPlayGame } from './schemas/userPlayGame.schema'
import { UsersPlayGamesService } from './usersPlayGames.service'

@ApiTags('Users Play Games')
@Controller('users-play-games')
export class UsersPlayGamesController {
  constructor(private readonly userPlayGamesService: UsersPlayGamesService) {}

  @ApiGlobalResponse(UserPlayGame, {
    description: 'Create new game progress',
  })
  @Post()
  async userPlayGameEntry(@Body() createGameDto: CreateUserPlayGameDto): Promise<UserPlayGame> {
    console.log('Dto', createGameDto)
    return await this.userPlayGamesService.createUserPlayGameEntry(createGameDto)
  }

  @ApiGlobalResponse(GameProgress, {
    description: 'Get all games and augment them with completed status',
  })
  @Get()
  async getComspletedGames(@Query('userId') userId: string) {
    console.log('userId in controller', userId)
    return await this.userPlayGamesService.getCompletedGames(userId)
  }

  @ApiGlobalResponse(UserPlayGame, {
    description: 'Update game progress',
  })
  @Put()
  async updateGameProgress(@Body() updateDto: UpdateUserPlayGameDto): Promise<UserPlayGame> {
    return await this.userPlayGamesService.updateGameProgress(updateDto)
  }
}
