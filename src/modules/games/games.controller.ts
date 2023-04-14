import { ApiGlobalResponse } from 'common/decorators/api-global-response.decorators'
import { Body, Controller, Post } from '@nestjs/common'
import { CreateGamesDto } from './schemas/dto/create-game.dto'
import { Game } from './schemas/game.schema'
import { GamesService } from './games.service'

@Controller('game')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}
  @ApiGlobalResponse(Game, {
    description: 'Create new Game and save to database',
  })
  @Post()
  create(@Body() userDto: CreateGamesDto): Promise<Game> {
    return this.gamesService.create(userDto)
  }
}
