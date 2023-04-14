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

  @ApiProperty()
  @Prop({ required: true })
  description: string

  @ApiProperty()
  @Prop({ required: true })
  image: string

  @ApiProperty()
  @Prop({ required: true })
  ageRange: string

  @ApiProperty()
  @Prop({ required: false })
  preRequisites: string

  @ApiProperty()
  @Prop({ required: true })
  objectives: string

  @ApiProperty()
  @Prop({ required: true })
  type: string

  @ApiProperty()
  @Prop({ default: [], required: true })
  missions: [Mission]
}

export const CourseSchema = SchemaFactory.createForClass(Course)
