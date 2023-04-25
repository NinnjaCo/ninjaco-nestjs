import { CreateFeedbackDto } from './dto/create-feedback.dto'
import { Feedback } from './schemas/feedbacks.schema'
import { FeedbacksRepository } from './feedbacks.repository'
import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { MongoServerError } from 'mongodb'
import { handleMongoDuplicateKeyError } from 'common/shared'

@Injectable()
export class FeedbacksService {
  constructor(private readonly feedbacksRepository: FeedbacksRepository) {}

  async findAll(): Promise<Feedback[]> {
    return await this.feedbacksRepository.find({})
  }

  async createFeedback(feedbackDto: CreateFeedbackDto): Promise<Feedback> {
    try {
      const feedback = await this.feedbacksRepository.create(feedbackDto)
      return feedback
    } catch (error) {
      // if error type is from mongodb
      if (error instanceof MongoServerError) {
        // This will automatically throw a BadRequestException with the duplicate key error message
        handleMongoDuplicateKeyError(error)
      } else {
        throw new InternalServerErrorException(error)
      }
    }
  }
}
