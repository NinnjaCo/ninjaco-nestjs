import { IsNotEmpty, IsString } from 'class-validator'
import { Level } from '../schemas/level.schema'
import { Prop } from '@nestjs/mongoose'

export class CreateMissionDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsString()
  @IsNotEmpty()
  image: string

  @IsString()
  @IsNotEmpty()
  categoryId: string
}
