import { CoursesModule } from '../courses/courses.module'
import { Feedback, FeedbackSchema } from './schemas/feedbacks.schema'
import { FeedbacksController } from './feedbacks.controller'
import { FeedbacksRepository } from './feedbacks.repository'
import { FeedbacksService } from './feedbacks.service'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Feedback.name, schema: FeedbackSchema }]),
    CoursesModule,
    UsersModule,
  ],
  controllers: [FeedbacksController],
  providers: [FeedbacksService, FeedbacksRepository],
  exports: [FeedbacksService],
})
export class FeedbacksModule {}
