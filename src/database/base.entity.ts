import { ApiProperty } from '@nestjs/swagger'
import { Prop } from '@nestjs/mongoose'
import mongoose from 'mongoose'

export class BaseEntity {
  @ApiProperty({
    type: mongoose.Schema.Types.ObjectId,
    format: 'uuid',
    example: '507f191e810c19729de860ea',
  })
  _id: mongoose.Types.ObjectId

  @ApiProperty({ type: Date, example: '2021-01-01T00:00:00.000Z' })
  @Prop()
  createdAt: string

  @ApiProperty({ type: Date, example: '2021-01-01T00:00:00.000Z' })
  @Prop()
  updatedAt: string
}
