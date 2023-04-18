import { ApiProperty } from '@nestjs/swagger'
import { BaseEntity } from 'database/base.entity'
import { Course } from 'modules/courses/schemas/course.schema'
import { HydratedDocument } from 'mongoose'
import { MissionManagement } from './MissionManagement.schema'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { User } from 'modules/users/schemas/user.schema'

export type CourseEnrollmentDocument = HydratedDocument<CourseEnrollment>

@Schema({ collection: 'User_enroll_course', timestamps: true })
export class CourseEnrollment extends BaseEntity {
  @ApiProperty()
  @Prop({ required: true, type: 'ObjectId', ref: User.name })
  user: User

  @ApiProperty()
  @Prop({ required: true, type: 'ObjectId', ref: Course.name })
  course: Course

  @ApiProperty()
  @Prop({ required: true })
  enrolledAt: string

  @ApiProperty()
  @Prop({ default: false, required: true })
  completed: boolean

  @ApiProperty()
  @Prop({ default: [], required: true })
  missions: MissionManagement[]
}

export const CourseEnrollmentSchema = SchemaFactory.createForClass(CourseEnrollment)
