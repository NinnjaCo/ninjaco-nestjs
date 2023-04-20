import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsOptional } from 'class-validator'

export class UpdateUserPlayGameDto {
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  completed: boolean
}
