import { Game, GameSchema } from './schemas/game.schema'
import { GamesController } from './games.controller'
import { GamesRepository } from './games.rpeository'
import { GamesService } from './games.service'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }])],
  controllers: [GamesController],
  providers: [GamesService, GamesRepository],
  exports: [],
})
export class GamesModule {}
