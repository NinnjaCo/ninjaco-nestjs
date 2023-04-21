import { EntityRepository } from '../../database/entity.repository'
import { FilterQuery, Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { User, UserDocument } from './schemas/user.schema'

@Injectable()
export class UsersRepository extends EntityRepository<UserDocument> {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {
    super(userModel)
  }

  async findOne(
    entityFilterQuery: FilterQuery<UserDocument>,
    projection?: Record<string, unknown>
  ): Promise<UserDocument> {
    return await this.userModel.findOne(entityFilterQuery, projection).populate('role')
  }

  async find(entityFilterQuery: FilterQuery<UserDocument>): Promise<UserDocument[]> {
    return await this.userModel.find(entityFilterQuery).populate('role')
  }
}
