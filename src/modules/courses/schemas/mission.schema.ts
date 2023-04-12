import { ApiProperty } from '@nestjs/swagger'
import { BaseEntity } from 'database/base.entity'
import { HydratedDocument } from 'mongoose'
import { Level } from './level.schema'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Role } from 'modules/roles/schemas/role.schema'

export type MissionDocument = HydratedDocument<Mission>
export class Mission extends BaseEntity {
  @ApiProperty()
  @Prop({ required: true })
  title: string

  @ApiProperty()
  @Prop({ required: true })
  description: string

  levels: Level[]
}

export const MissionSchema = SchemaFactory.createForClass(Mission)
