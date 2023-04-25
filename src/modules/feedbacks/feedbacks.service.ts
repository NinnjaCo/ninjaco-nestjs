import { CoursesService } from 'modules/courses/courses.service'
import { CreateFeedbackDto } from './dto/create-feedback.dto'
import { Feedback } from './schemas/feedbacks.schema'
import { FeedbacksRepository } from './feedbacks.repository'
import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { MongoServerError } from 'mongodb'
import { UsersService } from 'modules/users/users.service'
import { handleMongoDuplicateKeyError } from 'common/shared'

@Injectable()
export class FeedbacksService {
  constructor(
    private readonly feedbacksRepository: FeedbacksRepository,
    private readonly coursesService: CoursesService,
    private readonly userService: UsersService
  ) {}

  /**
   * Find all feedbacks
   * @returns Promise<Feedback[]> if feedbacks are found, otherwise empty array
   */
  async findAll(): Promise<Feedback[]> {
    return await this.feedbacksRepository.find({})
  }

  /**
   * create feedback
   * @param feedbackDto
   * @returns promise<feedback>
   */
  async createFeedback(userId: string, feedbackDto: CreateFeedbackDto): Promise<Feedback> {
    // get the user Object and the course
    const user = await this.userService.findOne(userId)
    const course = await this.coursesService.findCourseById(feedbackDto.courseId)
    const mission = await this.coursesService.findMissionById(
      feedbackDto.courseId,
      feedbackDto.missionId
    )
    const level = await this.coursesService.findLevelById(
      feedbackDto.courseId,
      feedbackDto.missionId,
      feedbackDto.levelId
    )

    const feedbackObject = {
      user,
      course,
      mission,
      level,
      rating: feedbackDto.rating,
      message: feedbackDto.message,
    }
    try {
      return await this.feedbacksRepository.create(feedbackObject)
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
