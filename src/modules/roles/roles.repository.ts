import { EntityRepository } from '../../database/entity.repository'
import { FilterQuery, Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { Role, RoleDocument } from './schemas/role.schema'

@Injectable()
export class RolesRepository extends EntityRepository<RoleDocument> {
  constructor(@InjectModel(Role.name) private readonly roleModel: Model<RoleDocument>) {
    super(roleModel)
  }

  /**
   * Check if role exists
   * @param filter
   * @returns {Promise<boolean>}
   * @memberof RolesRepository
   */
  async exists(filter: FilterQuery<RoleDocument>): Promise<boolean> {
    return (await this.roleModel.exists(filter)) !== null
  }
}
