import { ApiGlobalResponse } from 'common/decorators/api-global-response.decorators'
import { ApiTags } from '@nestjs/swagger'
import { Body, Controller, Post } from '@nestjs/common'
import { CreateGameDto } from './schemas/dto/create-game.dto'
import { Game } from './schemas/game.schema'
import { GamesService } from './games.service'
import { RoleEnum } from 'modules/roles/roles.enum'
import { Roles } from 'modules/roles/roles.decorator'

@ApiTags('Games')
@Controller('game')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}
  @ApiGlobalResponse(Game, {
    description: 'Create new Game and save to database',
  })
  @Post()
  @Roles(RoleEnum.ADMIN || RoleEnum.CREATOR)
  create(@Body() userDto: CreateGameDto): Promise<Game> {
    return this.gamesService.create(userDto)
  }
}
