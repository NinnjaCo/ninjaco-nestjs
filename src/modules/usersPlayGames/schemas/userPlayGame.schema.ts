import { ApiProperty } from '@nestjs/swagger'
import { BaseEntity } from '../../../database/base.entity'
import { Game } from '../../games/schemas/game.schema'
import { GameProgress } from '../../usersGameProgress/schema/game-progress.schema'
import { HydratedDocument } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { User } from '../../users/schemas/user.schema'

export type UserPlayGameDocument = HydratedDocument<UserPlayGame>

@Schema({ collection: 'usersPlayGames', timestamps: true })
export class UserPlayGame extends BaseEntity {
  @ApiProperty()
  @Prop({ required: true, type: 'ObjectId', ref: User.name })
  user: User

  @ApiProperty()
  @Prop({ required: true, type: 'ObjectId', ref: Game.name })
  game: Game

  @ApiProperty()
  @Prop({ required: true })
  startedAt: string

  @ApiProperty()
  @Prop({ required: true, type: 'ObjectId', ref: GameProgress.name })
  gameProgress: GameProgress

  @ApiProperty()
  @Prop({ default: false, required: true })
  completed: boolean
}

export const UserPlayGameSchema = SchemaFactory.createForClass(UserPlayGame)

UserPlayGameSchema.index({ user: 1, game: 1 }, { unique: true })
