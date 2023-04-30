import { ApiGlobalResponse } from '../../common/decorators/api-global-response.decorators'
import { ApiTags } from '@nestjs/swagger'
import { ArraySchema } from '../../swagger/swagger-primitive-type'
import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common'
import { CreateUserPlayGameDto } from './dto/create-user-play-game.dto'
import { Game } from '../games/schemas/game.schema'
import { UpdateUserPlayGameDto } from './dto/update-user-play-game.dto'
import { UserPlayGame } from './schemas/userPlayGame.schema'
import { UsersPlayGamesService } from './usersPlayGames.service'

@ApiTags('Users Play Games')
@Controller('users-play-games')
export class UsersPlayGamesController {
  constructor(private readonly userPlayGamesService: UsersPlayGamesService) {}

  @ApiGlobalResponse(UserPlayGame, {
    description: 'Create new user play game entry with its corresponding game progress',
  })
  @Post()
  async userPlayGameEntry(@Body() createGameDto: CreateUserPlayGameDto): Promise<UserPlayGame> {
    return await this.userPlayGamesService.createUserPlayGameEntry(createGameDto)
  }

  @ApiGlobalResponse(ArraySchema, {
    description:
      'Get all games and augment them with extra information if the user has played them',
  })
  @Get()
  async getCompletedGames(@Query('userId') userId: string) {
    return await this.userPlayGamesService.getCompletedGames(userId)
  }

  @ApiGlobalResponse(UserPlayGame, {
    description: 'Get user play game entry by id',
  })
  @Get(':gameId')
  async getUserPlayGameEntry(
    @Param('gameId') gameId: string,
    @Query('userId') userId: string
  ): Promise<Game | UserPlayGame> {
    return await this.userPlayGamesService.getUserPlayGameEntry(gameId, userId)
  }

  @ApiGlobalResponse(UserPlayGame, {
    description: 'Update user play game entry, i.e. completed status',
  })
  @Put(':id')
  async updateGameProgress(
    @Param('id') id: string,
    @Body() updateDto: UpdateUserPlayGameDto
  ): Promise<UserPlayGame> {
    return await this.userPlayGamesService.updateUserPlayGame(id, updateDto)
  }
}
