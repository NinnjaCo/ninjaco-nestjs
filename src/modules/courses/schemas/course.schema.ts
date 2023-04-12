import { ApiProperty } from '@nestjs/swagger'
import { BaseEntity } from 'database/base.entity'
import { HydratedDocument } from 'mongoose'
import { Mission } from './mission.schema'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type CourseDocument = HydratedDocument<Course>

@Schema({ collection: 'courses' })
export class Course extends BaseEntity {
  @ApiProperty()
  @Prop({ required: true })
  title: string
  description: string
  missions: Mission[]
}

export const CourseSchema = SchemaFactory.createForClass(Course)
