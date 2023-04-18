import { EntityRepository } from 'database/entity.repository'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { LevelProgress, LevelProgressDocument } from './schema/LevelProgress.schema'
import { Model } from 'mongoose'

@Injectable()
export class UsersLevelsProgressRepository extends EntityRepository<LevelProgressDocument> {
  constructor(
    @InjectModel(LevelProgress.name)
    private readonly levelProgressModel: Model<LevelProgressDocument>
  ) {
    super(levelProgressModel)
  }
}
