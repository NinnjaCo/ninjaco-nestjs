import { GamesEnrollmentController } from './games-enrollment.controller'
import { GamesEnrollmentService } from './games-enrollment.service'
import { GamesProgessRepository } from './games-progress.repository'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserPlayGame, UserPlayGameSchema } from './schemas/user-play-game.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: UserPlayGame.name, schema: UserPlayGameSchema }])],
  controllers: [GamesEnrollmentController],
  providers: [GamesEnrollmentService, GamesProgessRepository],
})
export class GamesEnrollmentModule {}
