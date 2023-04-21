import { GameProgress, GameProgressSchema } from './schema/game-progress.schema'
import { GameProgressController } from './game-progress.controller'
import { GameProgressRepository } from './game-progress.repository'
import { GameProgressService } from './game-progress.service'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [MongooseModule.forFeature([{ name: GameProgress.name, schema: GameProgressSchema }])],
  controllers: [GameProgressController],
  providers: [GameProgressService, GameProgressRepository],
  exports: [GameProgressService, GameProgressRepository],
})
export class GameProgressModule {}
