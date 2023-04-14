import { IsNotEmpty, IsString } from 'class-validator'

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
