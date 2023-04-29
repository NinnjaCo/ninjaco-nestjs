import { ApiProperty } from '@nestjs/swagger'
import { BaseEntity } from '../../../database/base.entity'
import { Course } from '../../courses/schemas/course.schema'
import { HydratedDocument } from 'mongoose'
import { MissionManagement } from './MissionManagement.schema'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { User } from '../../users/schemas/user.schema'

export type CourseEnrollmentDocument = HydratedDocument<CourseEnrollment>

@Schema({ collection: 'courseEnrollments', timestamps: true })
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
  missions: [MissionManagement]
}

export const CourseEnrollmentSchema = SchemaFactory.createForClass(CourseEnrollment)

// Set the index of the course and user to be unique
// To prevent the same user from enrolling in the same course more than once, and increase the performance of the query
CourseEnrollmentSchema.index({ course: 1, user: 1 }, { unique: true })
