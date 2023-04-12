import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
export class UpdateMissionDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  image: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  categoryId: string
}
