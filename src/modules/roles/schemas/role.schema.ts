import { ApiProperty } from '@nestjs/swagger'
import { BaseEntity } from 'database/base.entity'
import { HydratedDocument } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { RoleEnum } from '../roles.enum'

export type RoleDocument = HydratedDocument<Role>

@Schema({ collection: 'roles' })
export class Role extends BaseEntity {
  @ApiProperty({ enum: RoleEnum })
  @Prop({ required: true })
  role: RoleEnum
}

export const RoleSchema = SchemaFactory.createForClass(Role)
