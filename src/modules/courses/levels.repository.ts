import { EntityRepository } from 'database/entity.repository'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { Level, LevelDocument } from './schemas/level.schema'
import { Model } from 'mongoose'

@Injectable()
export class LevelsRepository extends EntityRepository<LevelDocument> {
  constructor(@InjectModel(Level.name) private readonly LevelModel: Model<LevelDocument>) {
    super(LevelModel)
  }
}
