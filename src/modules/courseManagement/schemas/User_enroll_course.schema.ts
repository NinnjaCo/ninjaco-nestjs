import { ApiProperty } from '@nestjs/swagger'
import { BaseEntity } from 'database/base.entity'
import { HydratedDocument } from 'mongoose'
import { MissionManagement } from './MissionManagement.schema'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type User_enroll_courseDocument = HydratedDocument<User_enroll_course>
@Schema({ collection: 'User_enroll_course', timestamps: true })
export class User_enroll_course extends BaseEntity {
  @ApiProperty()
  @Prop({ required: true })
  userId: string

  @ApiProperty()
  @Prop({ required: true })
  courseId: string

  @ApiProperty()
  @Prop({ required: true })
  enrolledAt: string

  @ApiProperty()
  @Prop({ required: true })
  completed: boolean

  @ApiProperty()
  @Prop({ required: true })
  missions: MissionManagement[]
}

export const User_enroll_courseSchema = SchemaFactory.createForClass(User_enroll_course)
