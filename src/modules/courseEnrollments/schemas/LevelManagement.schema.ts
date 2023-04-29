import { ApiProperty } from '@nestjs/swagger'
import { BaseEntity } from '../../../database/base.entity'
import { HydratedDocument } from 'mongoose'
import { Level } from '../../../modules/courses/schemas/level.schema' // TODO: Change to 'src/modules/courses/schemas/level.schema
import { LevelProgress } from '../../usersLevelsProgress/schema/LevelProgress.schema'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type LevelManagementDocument = HydratedDocument<LevelManagement>

@Schema({ collection: 'levelManagements', timestamps: true })
export class LevelManagement extends BaseEntity {
  @ApiProperty()
  @Prop({ required: true, type: 'ObjectId', ref: Level.name })
  level: Level

  @ApiProperty()
  @Prop({ required: true, type: 'ObjectId', ref: LevelProgress.name })
  levelProgress: LevelProgress

  @ApiProperty()
  @Prop({ default: false, required: true })
  completed: boolean

  @ApiProperty()
  @Prop({ required: true })
  startedAt: string
}

export const LevelManagementSchema = SchemaFactory.createForClass(LevelManagement)

LevelManagementSchema.index({ level: 1, levelProgress: 1 }, { unique: true })
