import { IsNotEmpty, IsString, isArray } from 'class-validator'
import { Mission } from '../schemas/mission.schema'

export class CreateCourseDto {
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
  ageRange: string

  @IsString()
  @IsNotEmpty()
  preRequisites: string

  @IsString()
  @IsNotEmpty()
  objectives: string

  @IsString()
  @IsNotEmpty()
  type: string

  missions: Mission[]
}
