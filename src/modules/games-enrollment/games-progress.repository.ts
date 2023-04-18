import { EntityRepository } from 'database/entity.repository'
import { GameProgress, GameProgressDocument } from './schemas/game-progress.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'

@Injectable()
export class GamesProgessRepository extends EntityRepository<GameProgressDocument> {
  constructor(
    @InjectModel(GameProgress.name) private readonly gameProgressModel: Model<GameProgressDocument>
  ) {
    super(gameProgressModel)
  }
}
