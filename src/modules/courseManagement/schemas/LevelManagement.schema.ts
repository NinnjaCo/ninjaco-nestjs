import { ApiProperty } from '@nestjs/swagger'
import { BaseEntity } from 'database/base.entity'
import { HydratedDocument } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type LevelManagementDocument = HydratedDocument<LevelManagement>

@Schema({ collection: 'LevelManagement', timestamps: true })
export class LevelManagement extends BaseEntity {
  @ApiProperty()
  @Prop({ required: true })
  levelId: string

  @ApiProperty()
  @Prop({ required: true })
  levelProgressId: string

  @ApiProperty()
  @Prop({ required: true })
  completed: boolean
}

export const LevelManagementSchema = SchemaFactory.createForClass(LevelManagement)
