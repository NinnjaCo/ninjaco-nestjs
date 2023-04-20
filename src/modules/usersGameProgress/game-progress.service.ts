import { CreateGameProgressDto } from './dto/create-game-progress.dto'
import { GameProgress } from './schema/game-progress.schema'
import { GameProgressRepository } from './game-progress.repository'
import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { MongoServerError } from 'mongodb'
import { UpdateGameProgressDto } from './dto/update-game-progress.dto'
import { handleMongoDuplicateKeyError } from '../../common/shared'

@Injectable()
export class GameProgressService {
  constructor(private readonly gameProgressRepository: GameProgressRepository) {}

  /**
   * Update game progress
   * @param id
   * @param updateDto
   * @returns {Promise<GameProgress>}
   */
  async updateGameProgress(id: string, updateDto: UpdateGameProgressDto): Promise<GameProgress> {
    return await this.gameProgressRepository.findOneAndUpdate({ _id: id }, updateDto)
  }

  /**
   * Get game progress by id
   * @param id
   * @returns {Promise<GameProgress>}
   * @throws {BadRequestException}
   * @throws {InternalServerErrorException}
   * @throws {NotFoundException}
   */
  async getGameProgress(id: string): Promise<GameProgress> {
    return await this.gameProgressRepository.findOne({ _id: id })
  }

  /**
   * Create a new game progress entry
   * @param createDto
   * @returns {Promise<GameProgress>}
   * @throws {InternalServerErrorException}
   * @throws {BadRequestException}
   */
  async create(createDto: CreateGameProgressDto): Promise<GameProgress> {
    try {
      return await this.gameProgressRepository.create(createDto)
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
