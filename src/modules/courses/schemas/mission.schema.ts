import { ApiProperty } from '@nestjs/swagger'
import { BaseEntity } from 'database/base.entity'
import { Categorie } from './categorie.schema'
import { HydratedDocument } from 'mongoose'
import { Level } from './level.schema'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type MissionDocument = HydratedDocument<Mission>
export class Mission extends BaseEntity {
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
  categoryId: string

  levels: Level[]
}

export const MissionSchema = SchemaFactory.createForClass(Mission)
