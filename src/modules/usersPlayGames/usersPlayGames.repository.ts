import { EntityRepository } from 'database/entity.repository'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { UserPlayGame, UserPlayGameDocument } from './schemas/userPlayGame.schema'

@Injectable()
export class UsersPlayGamesRepository extends EntityRepository<UserPlayGameDocument> {
  constructor(
    @InjectModel(UserPlayGame.name) private readonly userPlayGameModel: Model<UserPlayGameDocument>
  ) {
    super(userPlayGameModel)
  }
  async createUserPlayGameEntry({
    game,
    user,
    gameProgressId,
    completed,
    startedAt,
  }): Promise<UserPlayGame> {
    const userPlayGameEntry = await this.userPlayGameModel.create({
      game,
      user,
      gameProgressId,
      completed,
      startedAt,
    })
    return await (await (await userPlayGameEntry.save()).populate('game')).populate('user')
  }
}
