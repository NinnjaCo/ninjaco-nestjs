import { LevelProgress, LevelProgressSchema } from './schemas/LevelProgress.schema'
import { LevelProgressController } from './levelProgress.controller'
import { LevelProgressRepository } from './levelProgress.repository'
import { LevelProgressService } from './levelProgress.service'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [MongooseModule.forFeature([{ name: LevelProgress.name, schema: LevelProgressSchema }])],
  controllers: [LevelProgressController],
  providers: [LevelProgressRepository, LevelProgressService],
  exports: [LevelProgressService],
})
export class LevelProgressModule {}
