import { ApiProperty } from '@nestjs/swagger'
import { BaseEntity } from 'database/base.entity'
import { HydratedDocument } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type LevelManagementDocument = HydratedDocument<LevelManagement>

@Schema({ collection: 'LevelManagement', timestamps: true })
export class LevelManagement extends BaseEntity {
  @ApiProperty()
  @Prop({ required: true })
  levelId: string // levelId from the levels table

  @ApiProperty()
  @Prop({ required: true })
  levelProgressId: string

  @ApiProperty()
  @Prop({ required: true })
  completed: boolean

  @ApiProperty()
  @Prop({ required: true })
  startedAt: string
}

export const LevelManagementSchema = SchemaFactory.createForClass(LevelManagement)
