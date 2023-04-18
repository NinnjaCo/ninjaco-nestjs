import { GameProgressModule } from 'modules/usersGameProgress/game-progress.module'
import { GamesModule } from 'modules/games/games.module'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserPlayGame, UserPlayGameSchema } from './schemas/userPlayGame.schema'
import { UsersPlayGamesController } from './usersPlayGames.controller'
import { UsersPlayGamesRepository } from './usersPlayGames.repository'
import { UsersPlayGamesService } from './usersPlayGames.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserPlayGame.name, schema: UserPlayGameSchema }]),
    GamesModule,
    GameProgressModule,
  ],
  controllers: [UsersPlayGamesController],
  providers: [UsersPlayGamesService, UsersPlayGamesRepository],
})
export class UsersPlayGamesModule {}
