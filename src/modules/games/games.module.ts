import { Game, GameSchema } from './schemas/game.schema'
import { GameProgressSchema } from './schemas/game-progress.schema'
import { GamesController } from './games.controller'
import { GamesRepository } from './games.repository'
import { GamesService } from './games.service'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserPlayGameSchema } from './schemas/user-play-game.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Game.name, schema: GameSchema },
      { name: 'UserPlayGame', schema: UserPlayGameSchema },
      { name: 'GameProgress', schema: GameProgressSchema },
    ]),
  ],
  controllers: [GamesController],
  providers: [GamesService, GamesRepository],
})
export class GamesModule {}
