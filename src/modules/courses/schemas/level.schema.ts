import { ApiProperty } from '@nestjs/swagger'
import { BaseEntity } from '../../../database/base.entity'
import { HydratedDocument } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type LevelDocument = HydratedDocument<Level>

@Schema({ collection: 'levels', timestamps: true })
export class Level extends BaseEntity {
  @ApiProperty()
  @Prop({ required: true })
  levelNumber: number

  @ApiProperty()
  @Prop({ required: false })
  buildingPartsImages: string[]

  @ApiProperty()
  @Prop({ required: false })
  stepGuideImages: string[]

  @ApiProperty()
  @Prop({ required: false })
  websitePreviewImage: string
}

export const LevelSchema = SchemaFactory.createForClass(Level)
