import { GameProgressSchema } from './schemas/game-progress.schema'
import { GamesEnrollmentController } from './games-enrollment.controller'
import { GamesEnrollmentService } from './games-enrollment.service'
import { GamesProgessRepository } from './games-progress.repository'
import { GamesRepository } from 'modules/games/games.repository'
import { GamesService } from 'modules/games/games.service'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserPlayGameSchema } from './schemas/user-play-game.schema'
import { UsersPlayGamesRepository } from './users-play-games.repository'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'GameProgess', schema: GameProgressSchema },
      { name: 'UserPlayGame', schema: UserPlayGameSchema },
    ]),
  ],
  controllers: [GamesEnrollmentController],
  providers: [
    GamesService,
    GamesRepository,
    GamesEnrollmentService,
    GamesProgessRepository,
    UsersPlayGamesRepository,
  ],
})
export class GamesEnrollmentModule {}
