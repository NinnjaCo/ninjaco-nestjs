import { ApiProperty } from '@nestjs/swagger'
import { BaseEntity } from 'database/base.entity'
import { Course } from 'modules/courses/schemas/course.schema'
import { HydratedDocument } from 'mongoose'
import { Level } from 'modules/courses/schemas/level.schema'
import { Mission } from 'modules/courses/schemas/mission.schema'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { User } from 'modules/users/schemas/user.schema'

export type FeedbackDocument = HydratedDocument<Feedback>

@Schema({ collection: 'feedbacks', timestamps: true })
export class Feedback extends BaseEntity {
  @ApiProperty()
  @Prop({ required: true, type: 'ObjectId', ref: User.name })
  user: User

  @ApiProperty()
  @Prop({ required: true, type: 'ObjectId', ref: Course.name })
  course: Course

  @ApiProperty()
  @Prop({ required: true, type: 'ObjectId', ref: Mission.name })
  mission: Mission

  @ApiProperty()
  @Prop({ required: true, type: 'ObjectId', ref: Level.name })
  level: Level

  @ApiProperty()
  @Prop({ required: true })
  rating: number

  @ApiProperty()
  @Prop({ required: false })
  message: string
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback)

FeedbackSchema.index({ user: 1, course: 1, mission: 1, level: 1 }, { unique: true })
