import { IsArray, IsNotEmpty, IsString } from 'class-validator'
import { Mission } from '../schemas/mission.schema'
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
