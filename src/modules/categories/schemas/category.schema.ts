import { ApiProperty } from '@nestjs/swagger'
import { BaseEntity } from '../../../database/base.entity'
import { HydratedDocument } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type CategoryDocument = HydratedDocument<Category>

@Schema({ collection: 'categories', timestamps: true })
export class Category extends BaseEntity {
  @ApiProperty()
  @Prop({ required: true, unique: true })
  categoryName: string
}

export const CategorySchema = SchemaFactory.createForClass(Category)
