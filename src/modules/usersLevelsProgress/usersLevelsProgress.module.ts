import { LevelProgress, LevelProgressSchema } from './schema/LevelProgress.schema'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersLevelsProgressController } from './usersLevelsProgress.controller'
import { UsersLevelsProgressRepository } from './usersLevelsProgress.repository'
import { UsersLevelsProgressService } from './usersLevelsProgress.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: LevelProgress.name, schema: LevelProgressSchema }])],
  controllers: [UsersLevelsProgressController],
  providers: [UsersLevelsProgressService, UsersLevelsProgressRepository],
  exports: [UsersLevelsProgressService],
})
export class UserLevelProgressModule {}
