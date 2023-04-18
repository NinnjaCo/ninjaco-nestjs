import { Injectable } from '@nestjs/common'
import { LevelProgress } from './schemas/LevelProgress.schema'
import { LevelProgressRepository } from './levelProgress.repository'

@Injectable()
export class LevelProgressService {
  constructor(private readonly levelProgressRepository: LevelProgressRepository) {}
  async findAll(): Promise<LevelProgress[]> {
    return await this.levelProgressRepository.find({})
  }
}
