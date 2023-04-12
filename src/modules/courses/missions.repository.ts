import { EntityRepository } from 'database/entity.repository'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { Mission, MissionDocument } from './schemas/mission.schema'
import { Model } from 'mongoose'

@Injectable()
export class MissionRepository extends EntityRepository<MissionDocument> {
  constructor(@InjectModel(Mission.name) private readonly MissionModel: Model<MissionDocument>) {
    super(MissionModel)
  }
}
