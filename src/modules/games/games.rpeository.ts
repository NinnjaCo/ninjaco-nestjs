import { EntityRepository } from 'database/entity.repository'
import { FilterQuery, Model } from 'mongoose'
import { Game, GameDocument } from './schemas/game.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'

@Injectable()
export class GamesRepository extends EntityRepository<GameDocument> {
  constructor(@InjectModel(Game.name) private readonly gameModel: Model<GameDocument>) {
    super(gameModel)
  }

  async findOne(
    entityFilterQuery: FilterQuery<GameDocument>,
    projection?: Record<string, unknown>
  ): Promise<GameDocument> {
    return await this.gameModel.findOne(entityFilterQuery, projection)
  }

  async find(entityFilterQuery: FilterQuery<GameDocument>): Promise<GameDocument[]> {
    return await this.gameModel.find(entityFilterQuery)
  }
}
