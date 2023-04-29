import { EntityRepository } from '../../database/entity.repository'
import { GameProgress, GameProgressDocument } from './schema/game-progress.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'

@Injectable()
export class GameProgressRepository extends EntityRepository<GameProgressDocument> {
  constructor(
    @InjectModel(GameProgress.name) private readonly gameProgressModel: Model<GameProgressDocument>
  ) {
    super(gameProgressModel)
  }
}
