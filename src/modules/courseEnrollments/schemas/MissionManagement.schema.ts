import { ApiProperty } from '@nestjs/swagger'
import { BaseEntity } from 'database/base.entity'
import { HydratedDocument } from 'mongoose'
import { LevelManagement } from './LevelManagement.schema'
import { Mission } from 'modules/courses/schemas/mission.schema'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type MissionManagementDocument = HydratedDocument<MissionManagement>

@Schema({ collection: 'missionManagements', timestamps: true })
export class MissionManagement extends BaseEntity {
  @ApiProperty()
  @Prop({ required: true, type: 'ObjectId', ref: Mission.name })
  mission: Mission

  @ApiProperty()
  @Prop({ required: true })
  startedAt: string

  @ApiProperty()
  @Prop({ default: false, required: true })
  completed: boolean

  @ApiProperty()
  @Prop({ default: [], required: true })
  levels: [LevelManagement]
}

export const MissionManagementSchema = SchemaFactory.createForClass(MissionManagement)
