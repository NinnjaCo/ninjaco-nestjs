import { EntityRepository } from 'database/entity.repository'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { UserPlayGame, UserPlayGameDocument } from './schemas/user-play-game.schema'

@Injectable()
export class UsersPlayGamesRepository extends EntityRepository<UserPlayGameDocument> {
  constructor(
    @InjectModel(UserPlayGame.name) private readonly userPlayGameModel: Model<UserPlayGameDocument>
  ) {
    super(userPlayGameModel)
  }
}
