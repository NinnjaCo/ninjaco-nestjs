import { ApiProperty } from '@nestjs/swagger'
import { BaseEntity } from 'database/base.entity'
import { HydratedDocument } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type UserDocument = HydratedDocument<User>

@Schema({ collection: 'users' })
export class User extends BaseEntity {
  @ApiProperty()
  @Prop({ required: true })
  name: string

  @ApiProperty()
  @Prop({ required: true })
  email: string

  @ApiProperty()
  @Prop({ required: true })
  password: string
}

export const UserSchema = SchemaFactory.createForClass(User)
