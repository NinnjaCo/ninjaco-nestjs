import { ApiProperty } from '@nestjs/swagger'
import { BaseEntity } from '../../../database/base.entity'
import { HydratedDocument } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type GameDocument = HydratedDocument<Game>

@Schema({ collection: 'games', timestamps: true })
export class Game extends BaseEntity {
  @ApiProperty()
  @Prop({ required: true })
  title: string

  @ApiProperty()
  @Prop({ required: true })
  image: string

  @ApiProperty()
  @Prop({ required: true })
  playerDirection: string

  @ApiProperty()
  @Prop()
  numOfBlocks: number

  @ApiProperty()
  @Prop({ required: true })
  sizeOfGrid: number

  @ApiProperty()
  @Prop({ required: true })
  playerLocation: Array<number>

  @ApiProperty()
  @Prop({ required: true })
  goalLocation: Array<number>

  @ApiProperty()
  @Prop()
  wallsLocations: Array<Array<number>>
}

export const GameSchema = SchemaFactory.createForClass(Game)
