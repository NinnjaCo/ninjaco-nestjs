import { ApiProperty } from '@nestjs/swagger'
import { BaseEntity } from 'database/base.entity'
import { Course } from '../..//courses/schemas/course.schema'
import { HydratedDocument } from 'mongoose'
import { Level } from '../../courses/schemas/level.schema'
import { Mission } from '../../courses/schemas/mission.schema'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { User } from '../..//users/schemas/user.schema'

export type LevelProgressDocument = HydratedDocument<LevelProgress>

@Schema({ collection: 'levelProgress', timestamps: true })
export class LevelProgress extends BaseEntity {
  @ApiProperty()
  @Prop({ required: true, type: 'ObjectId', ref: Course.name })
  courseId: string

  @ApiProperty()
  @Prop({ required: true, type: 'ObjectId', ref: Level.name })
  levelId: string

  @ApiProperty()
  @Prop({ required: true, type: 'ObjectId', ref: User.name })
  userId: string

  @ApiProperty()
  @Prop({ required: true, type: 'ObjectId', ref: Mission.name })
  missionId: string

  @ApiProperty()
  @Prop({ default: '' })
  progress: string
}

export const LevelProgressSchema = SchemaFactory.createForClass(LevelProgress)

// Set indexes to improve query performance
LevelProgressSchema.index({ courseId: 1, levelId: 1, userId: 1, missionId: 1 }, { unique: true })
