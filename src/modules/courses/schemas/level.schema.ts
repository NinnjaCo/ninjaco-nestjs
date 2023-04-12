import { ApiProperty } from '@nestjs/swagger'
import { BaseEntity } from 'database/base.entity'
import { HydratedDocument } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type LevelDocument = HydratedDocument<Level>
export class Level extends BaseEntity {
  @ApiProperty()
  @Prop({ required: true })
  levelNumber: number

  @ApiProperty()
  @Prop({ required: true })
  buldingPartsImages: string[]

  @ApiProperty()
  @Prop({ required: true })
  stepGuideImages: string[]
}

export const LevelSchema = SchemaFactory.createForClass(Level)
