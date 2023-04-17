import { ApiProperty } from '@nestjs/swagger'
import { BaseEntity } from 'database/base.entity'
import { HydratedDocument } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type LevelProgressDocument = HydratedDocument<LevelProgress>

@Schema({ collection: 'LevelProgress', timestamps: true })
export class LevelProgress extends BaseEntity {
  @ApiProperty()
  @Prop({ required: true })
  courseId: string

  @ApiProperty()
  @Prop({ required: true })
  levelId: string

  @ApiProperty()
  @Prop({ required: true })
  userId: string

  @ApiProperty()
  @Prop({ required: true })
  missionId: string

  @ApiProperty()
  @Prop({ required: true })
  progress: string
}

export const LevelProgressSchema = SchemaFactory.createForClass(LevelProgress)
