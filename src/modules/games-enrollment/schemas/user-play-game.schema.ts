import { ApiProperty } from '@nestjs/swagger'
import { BaseEntity } from 'database/base.entity'
import { HydratedDocument } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type UserPlayGameDocument = HydratedDocument<UserPlayGame>
@Schema({ collection: 'usersPlayGames', timestamps: true })
export class UserPlayGame extends BaseEntity {
  @ApiProperty()
  @Prop({ required: true })
  userId: string

  @ApiProperty()
  @Prop({ required: true })
  gameId: string
  //how to put two fields as primary key in mongoose
  @ApiProperty()
  @Prop({ required: true })
  startedAt: string

  @ApiProperty()
  @Prop({ required: true, type: 'ObjectId' })
  gameProgressId: string

  @ApiProperty()
  @Prop({ required: false })
  completed: boolean
}

export const UserPlayGameSchema = SchemaFactory.createForClass(UserPlayGame)
