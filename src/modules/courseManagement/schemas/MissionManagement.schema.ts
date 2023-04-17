import { ApiProperty } from '@nestjs/swagger'
import { BaseEntity } from 'database/base.entity'
import { HydratedDocument } from 'mongoose'
import { LevelManagement } from './LevelManagement.schema'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type MissionManagementDocument = HydratedDocument<MissionManagement>

@Schema({ collection: 'MissionManagement', timestamps: true })
export class MissionManagement extends BaseEntity {
  @ApiProperty()
  @Prop({ required: true })
  missionId: string // missionId from the missions table

  @ApiProperty()
  @Prop({ required: true })
  completed: boolean

  @ApiProperty()
  levels: LevelManagement[]

  @ApiProperty()
  @Prop({ required: true })
  startedAt: string
}

export const MissionManagementSchema = SchemaFactory.createForClass(MissionManagement)
