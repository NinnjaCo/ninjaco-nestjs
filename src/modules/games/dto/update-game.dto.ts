import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateGameDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string

<<<<<<< HEAD:src/modules/games/schemas/dto/update-game.dto.ts
  @IsString()
  image: string

=======
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  image: string

  @ApiProperty()
>>>>>>> 53e57dd2ccdfa32d3f950feb2134e1ce33c6d754:src/modules/games/dto/update-game.dto.ts
  @IsNumber()
  @IsOptional()
  numOfBlocks?: number

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  sizeOfGrid: number

  @ApiProperty()
  @IsNotEmpty()
  playerLocation: number[]

  @ApiProperty()
  @IsNotEmpty()
  goalLocation: number[]

  @ApiProperty()
  wallsLocations: number[][]
}
