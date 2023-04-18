import { Injectable } from '@nestjs/common'
import { LevelProgressRepository } from './levelProgress.repository'

@Injectable()
export class LevelProgressService {
  constructor(private readonly levelProgressRepository: LevelProgressRepository) {}
}
