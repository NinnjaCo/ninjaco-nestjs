import { GameProgressModule } from '../usersGameProgress/game-progress.module'
import { GamesModule } from '../games/games.module'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserPlayGame, UserPlayGameSchema } from './schemas/userPlayGame.schema'
import { UsersModule } from '../users/users.module'
import { UsersPlayGamesController } from './usersPlayGames.controller'
import { UsersPlayGamesRepository } from './usersPlayGames.repository'
import { UsersPlayGamesService } from './usersPlayGames.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserPlayGame.name, schema: UserPlayGameSchema }]),
    GamesModule,
    GameProgressModule,
    UsersModule,
  ],
  controllers: [UsersPlayGamesController],
  providers: [UsersPlayGamesService, UsersPlayGamesRepository],
})
export class UsersPlayGamesModule {}
