import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator'
export class UpdateLevelManagementDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  completed: boolean

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
  levelId: string
}
