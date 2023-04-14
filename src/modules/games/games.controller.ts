import { ApiGlobalResponse } from 'common/decorators/api-global-response.decorators'
import { ApiTags } from '@nestjs/swagger'
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { CreateGameDto } from './schemas/dto/create-game.dto'
import { Game } from './schemas/game.schema'
import { GamesService } from './games.service'
import { RoleEnum } from 'modules/roles/roles.enum'
import { Roles } from 'modules/roles/roles.decorator'
import { UpdateGameDto } from './schemas/dto/update-game.dto'

@ApiTags('Games')
@Controller('game')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}
  @ApiGlobalResponse(Game, {
    description: 'Create new game and save to database',
  })
  @Post()
  @Roles(RoleEnum.ADMIN, RoleEnum.CREATOR)
  create(@Body() userDto: CreateGameDto): Promise<Game> {
    return this.gamesService.create(userDto)
  }
  @ApiGlobalResponse(Game, {
    description: 'Get all games from database',
  })
  @Get()
  @Roles(RoleEnum.ADMIN, RoleEnum.CREATOR)
  findAll(): Promise<Game[]> {
    return this.gamesService.findAll()
  }
  @ApiGlobalResponse(Game, {
    description: 'Get one game by ID',
  })
  @Get(':id')
  @Roles(RoleEnum.ADMIN, RoleEnum.CREATOR)
  findOne(@Param('id') id: string): Promise<Game> {
    return this.gamesService.findOne(id)
  }
  @ApiGlobalResponse(Game, {
    description: 'Delete game by ID',
  })
  @Delete(':id')
  @Roles(RoleEnum.ADMIN, RoleEnum.CREATOR)
  delete(@Param('id') id: string): Promise<Game> {
    return this.gamesService.delete(id)
  }
  @Put(':id')
  @Roles(RoleEnum.ADMIN, RoleEnum.CREATOR)
  update(@Param('id') id: string, @Body() updateDto: UpdateGameDto): Promise<Game> {
    return this.gamesService.update(id, updateDto)
  }
}
