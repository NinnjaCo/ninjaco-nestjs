import { EntityRepository } from '../../database/entity.repository'
import { FilterQuery, Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { UserPlayGame, UserPlayGameDocument } from './schemas/userPlayGame.schema'

@Injectable()
export class UsersPlayGamesRepository extends EntityRepository<UserPlayGameDocument> {
  constructor(
    @InjectModel(UserPlayGame.name) private readonly userPlayGameModel: Model<UserPlayGameDocument>
  ) {
    super(userPlayGameModel)
  }

  /**
   * Override the create method to populate the game, user and gameProgress fields
   * @param userPlayGameEntryData
   * @returns {Promise<UserPlayGameDocument>}
   * @override
   * @see EntityRepository.create
   */
  async create(userPlayGameEntryData): Promise<UserPlayGameDocument> {
    const entity = new this.userPlayGameModel(userPlayGameEntryData)
    return (
      await (
        await (await entity.save()).populate('game')
      ).populate('user', '-password -verifyEmailToken -hashedRt -resetPasswordToken')
    ).populate('gameProgress')
  }

  /**
   * Override the findOne method to populate the game, user and gameProgress fields
   * @param entityFilterQuery
   * @param projection
   * @returns {Promise<UserPlayGameDocument>}
   * @override
   * @see EntityRepository.findOne
   */
  async findOne(
    entityFilterQuery: FilterQuery<UserPlayGameDocument>,
    projection?: Record<string, unknown>
  ): Promise<UserPlayGameDocument> {
    return await this.userPlayGameModel
      .findOne(entityFilterQuery, projection)
      .populate('game')
      .populate('user', '-password -verifyEmailToken -hashedRt -resetPasswordToken')
      .populate('gameProgress')
  }

  /**
   * Override the find method to populate the game, user and gameProgress fields
   * @param entityFilterQuery
   * @returns {Promise<UserPlayGameDocument[]>}
   * @override
   * @see EntityRepository.find
   */
  async find(
    entityFilterQuery: FilterQuery<UserPlayGameDocument>
  ): Promise<UserPlayGameDocument[]> {
    return await this.userPlayGameModel
      .find(entityFilterQuery)
      .populate('game')
      .populate('user', '-password -verifyEmailToken -hashedRt -resetPasswordToken')
      .populate('gameProgress')
  }
}
