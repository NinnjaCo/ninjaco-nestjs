import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { LevelProgress } from './schemas/LevelProgress.schema'
import { LevelProgressRepository } from './levelProgress.repository'
import { MongoServerError } from 'mongodb'
import { UpdateLevelProgressDto } from './dto/update-levelProgress.dto'
import { handleMongoDuplicateKeyError } from 'common/shared'

@Injectable()
export class LevelProgressService {
  constructor(private readonly levelProgressRepository: LevelProgressRepository) {}
  async findAll(): Promise<LevelProgress[]> {
    return await this.levelProgressRepository.find({})
  }

  async findLevelProgressById(id: string): Promise<LevelProgress> {
    return await this.levelProgressRepository.findOne({ _id: id })
  }

  async deleteCourse(id: string): Promise<LevelProgress> {
    return await this.levelProgressRepository.findOneAndDelete({ _id: id })
  }

  async updateCourse(id: string, progressDto: UpdateLevelProgressDto): Promise<LevelProgress> {
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
}
