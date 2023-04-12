import { ApiProperty } from '@nestjs/swagger'
import { BaseEntity } from 'database/base.entity'
import { HydratedDocument } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Role } from 'modules/roles/schemas/role.schema'

export type LevelDocument = HydratedDocument<Level>
export class Level extends BaseEntity {
  title: string
  description: string
}

export const LevelSchema = SchemaFactory.createForClass(Level)
