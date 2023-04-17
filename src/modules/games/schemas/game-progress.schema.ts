import { ApiProperty } from '@nestjs/swagger'
import { BaseEntity } from 'database/base.entity'
import { HydratedDocument } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type GameProgressDocument = HydratedDocument<GameProgress>

@Schema({ collection: 'GameProgress', timestamps: true })
export class GameProgress extends BaseEntity {
  @ApiProperty()
  @Prop({ required: true })
  userId: string

  @ApiProperty()
  @Prop({ required: true })
  gameId: string

  @ApiProperty()
  @Prop({ required: true })
  progress: string
}

export const GameProgressSchema = SchemaFactory.createForClass(GameProgress)
