import { ApiTags } from '@nestjs/swagger'
import { Body, Controller, Get, Post, Put } from '@nestjs/common'
import { UsersPlayGamesService } from './usersPlayGames.service'

@ApiTags('Users Play Games')
@Controller('users-play-games')
export class UsersPlayGamesController {
  constructor(private readonly userPlayGamesService: UsersPlayGamesService) {}

  // @ApiGlobalResponse(GameProgress, {
  //   description: 'Create new game progress',
  // })
  // @Post()
  // async createGameProgress(@Body() playDto: CreateGameProgressDto): Promise<GameProgress> {
  //   return await this.gamesEnrollmentService.createGameProgress(playDto)
  // }

  // @ApiGlobalResponse(GameProgress, {
  //   description: 'Get all games and specify whether they are completed or not',
  // })
  // @Get()
  // async getComspletedGames() {
  //   return await this.gamesEnrollmentService.getCompletedGames()
  // }

  // @ApiGlobalResponse(GameProgress, {
  //   description: 'Update game progress',
  // })
  // @Put(':id')
  // async updateGameProgress(@Body() updateDto: UpdateGameProgressDto): Promise<GameProgress> {
  //   return await this.gamesEnrollmentService.updateGameProgress(updateDto)
  // }
}
