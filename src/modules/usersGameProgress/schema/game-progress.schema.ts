import { ApiProperty } from '@nestjs/swagger'
import { BaseEntity } from 'database/base.entity'
import { Game } from 'modules/games/schemas/game.schema'
import { HydratedDocument } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { User } from 'modules/users/schemas/user.schema'

export type GameProgressDocument = HydratedDocument<GameProgress>

@Schema({ collection: 'gamesProgress', timestamps: true })
export class GameProgress extends BaseEntity {
  @ApiProperty()
  @Prop({ required: true, type: 'ObjectId', ref: User.name })
  userId: string

  @ApiProperty()
  @Prop({ required: true, type: 'ObjectId', ref: Game.name })
  gameId: string

  @ApiProperty()
  @Prop({ required: true, default: '' })
  progress: string
}

export const GameProgressSchema = SchemaFactory.createForClass(GameProgress)
