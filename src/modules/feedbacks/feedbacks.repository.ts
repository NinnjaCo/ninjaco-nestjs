import { EntityRepository } from '../../database/entity.repository'
import { Feedback, FeedbackDocument } from './schemas/feedbacks.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'

@Injectable()
export class FeedbacksRepository extends EntityRepository<FeedbackDocument> {
  constructor(@InjectModel(Feedback.name) private readonly feedbackModel: Model<FeedbackDocument>) {
    super(feedbackModel)
  }
}
