import { ApiProperty } from '@nestjs/swagger'
import { BaseEntity } from 'database/base.entity'
import { Course } from 'modules/courses/schemas/course.schema'
import { HydratedDocument } from 'mongoose'
import { Level } from 'modules/courses/schemas/level.schema'
import { Mission } from 'modules/courses/schemas/mission.schema'
import { Prop, SchemaFactory } from '@nestjs/mongoose'
import { User } from 'modules/users/schemas/user.schema'

export type CourseDocument = HydratedDocument<Feedback>

export class Feedback extends BaseEntity {
  @ApiProperty()
  @Prop({ required: true })
  author: User

  @ApiProperty()
  @Prop({ required: true })
  level: Level

  @ApiProperty()
  @Prop({ required: true })
  course: Course

  @ApiProperty()
  @Prop({ required: true })
  mission: Mission

  @ApiProperty()
  @Prop({ required: true })
  rating: number

  @ApiProperty()
  @Prop({ required: true })
  message: string
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback)
