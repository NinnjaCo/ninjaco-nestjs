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
  async findAll(): Promise<LevelProgress[]> {
    return await this.levelProgressRepository.find({})
  }

  async findLevelProgressById(id: string): Promise<LevelProgress> {
    return await this.levelProgressRepository.findOne({ _id: id })
  }

  async deleteCourse(id: string): Promise<LevelProgress> {
    return await this.levelProgressRepository.findOneAndDelete({ _id: id })
  }

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
}
