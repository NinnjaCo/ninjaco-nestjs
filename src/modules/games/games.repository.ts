import { EntityRepository } from 'database/entity.repository'
import { Game, GameDocument } from './schemas/game.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'

@Injectable()
export class GamesRepository extends EntityRepository<GameDocument> {
  constructor(@InjectModel(Game.name) private readonly gameModel: Model<GameDocument>) {
    super(gameModel)
  }
}
