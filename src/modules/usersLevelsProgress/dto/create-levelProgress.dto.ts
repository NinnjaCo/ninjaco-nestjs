import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateLevelProgressDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  levelId: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  courseId: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  missionId: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  progress: string
}
