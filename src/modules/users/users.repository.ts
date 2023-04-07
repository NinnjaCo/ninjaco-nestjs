import { Document, FilterQuery, Model, Types } from 'mongoose'
import { EntityRepository } from 'database/entity.repository'
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
}
