import { ApiProperty } from '@nestjs/swagger'
import { BaseEntity } from 'database/base.entity'
import { HydratedDocument } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type UserDocument = HydratedDocument<User>

@Schema({ collection: 'users' })
export class User extends BaseEntity {
  @ApiProperty()
  @Prop({ required: true })
  firstName: string

  @ApiProperty()
  @Prop({ required: true })
  lastName: string

  @ApiProperty({ type: Date, example: '2021-01-01T00:00:00.000Z' })
  @Prop({ required: true, type: Date })
  dateOfBirth: string

  @ApiProperty()
  @Prop({ required: true, unique: true })
  email: string

  @ApiProperty()
  @Prop({ required: true })
  password: string

  @ApiProperty()
  @Prop()
  hashedRt: string

  @ApiProperty()
  @Prop()
  resetPasswordToken: string
}

export const UserSchema = SchemaFactory.createForClass(User)
