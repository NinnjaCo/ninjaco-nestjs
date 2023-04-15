import { ApiProperty } from '@nestjs/swagger'
import { BaseEntity } from 'database/base.entity'
import { HydratedDocument } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Role } from 'modules/roles/schemas/role.schema'

export type UserDocument = HydratedDocument<User>

@Schema({ collection: 'users', timestamps: true })
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
  @Prop({ type: 'ObjectId', ref: Role.name })
  role: Role

  @ApiProperty()
  @Prop()
  resetPasswordToken: string

  @ApiProperty()
  @Prop()
  verifyEmailToken: string

  @ApiProperty()
  @Prop({ default: false })
  isVerified: boolean

  @ApiProperty()
  @Prop({ default: 0 })
  points: number

  @ApiProperty()
  @Prop()
  profilePicture: string
}

export const UserSchema = SchemaFactory.createForClass(User)
