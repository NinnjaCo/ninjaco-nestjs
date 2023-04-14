import { ApiProperty } from '@nestjs/swagger'
import { BaseEntity } from 'database/base.entity'
import { HydratedDocument } from 'mongoose'
import { Level } from './level.schema'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type MissionDocument = HydratedDocument<Mission>
@Schema({ collection: 'missions' })
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
  @Prop({ required: true })
  categoryId: string

  @ApiProperty()
  @Prop({ default: [], required: true })
  levels: [Level]
}

export const MissionSchema = SchemaFactory.createForClass(Mission)
