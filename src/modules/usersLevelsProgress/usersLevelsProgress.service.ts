import { CreateLevelProgressDto } from '../usersLevelsProgress/dto/create-levelProgress.dto'
import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { LevelProgress } from './schema/LevelProgress.schema'
import { MongoServerError } from 'mongodb'
import { UpdateLevelProgressDto } from '../usersLevelsProgress/dto/update-levelProgress.dto'
import { UsersLevelsProgressRepository } from './usersLevelsProgress.repository'
import { handleMongoDuplicateKeyError } from '../../common/shared'

@Injectable()
export class UsersLevelsProgressService {
  constructor(private readonly levelProgressRepository: UsersLevelsProgressRepository) {}

  /**
   *
   * @returns Promise <LevelProgress[]> if users are found, otherwise empty array
   * @description finds all users levels progresses
   *
   */
  async findAll(): Promise<LevelProgress[]> {
    return await this.levelProgressRepository.find({})
  }

  /**
   *
   * @param id
   * @returns Promise<LevelProgress> if level progress is found, otherwise null
   * @description finds level progress by id
   */

  async findLevelProgressById(id: string): Promise<LevelProgress> {
    return await this.levelProgressRepository.findOne({ _id: id })
  }

  /**
   *
   * @param id
   * @returns Promise<LevelProgress> if level progress is found, otherwise null
   * @description finds level progress by id and deletes it
   */

  async deleteLevel(id: string): Promise<LevelProgress> {
    return await this.levelProgressRepository.findOneAndDelete({ _id: id })
  }

  /**
   *
   * @param id
   * @param progressDto
   * @returns Promise <LevelProgress> if level progress is found, otherwise null
   * @description finds level progress by id and updates it
   */

  async updateLevelProgress(
    id: string,
    progressDto: UpdateLevelProgressDto
  ): Promise<LevelProgress> {
    try {
      return await this.levelProgressRepository.findOneAndUpdate({ _id: id }, progressDto)
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

  /**
   *
   * @param progressDto
   * @returns Promise <LevelProgress>
   * @description creates new level progress
   */

  async createLevelProgress(progressDto: CreateLevelProgressDto): Promise<LevelProgress> {
    try {
      const progress = await this.levelProgressRepository.create(progressDto)
      return progress
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

  /**
   * @param userId
   * @param courseId
   * @returns void
   * @description given userId and courseId, it deletes all level progress associated with the user and the course
   */
  async deleteAllLevelsProgress(courseId: string, userId: string): Promise<void> {
    await this.levelProgressRepository.deleteMany({ userId, courseId })
  }
}
