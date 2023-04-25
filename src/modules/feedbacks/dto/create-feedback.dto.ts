import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateFeedbackDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  levelId: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  courseId: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  missionId: string

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  rating: number

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  message: string
}
