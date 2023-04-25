import { Feedback, FeedbackSchema } from './schemas/feedbacks.schema'
import { FeedbacksController } from './feedbacks.controller'
import { FeedbacksRepository } from './feedbacks.repository'
import { FeedbacksService } from './feedbacks.service'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [MongooseModule.forFeature([{ name: Feedback.name, schema: FeedbackSchema }])],
  controllers: [FeedbacksController],
  providers: [FeedbacksService, FeedbacksRepository],
  exports: [FeedbacksService],
})
export class FeedbacksModule {}
