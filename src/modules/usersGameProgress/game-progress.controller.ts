import { ApiTags } from '@nestjs/swagger'
import { Body, Controller, Put } from '@nestjs/common'
import { GameProgress } from './schema/game-progress.schema'
import { GameProgressService } from './game-progress.service'
import { UpdateGameProgressDto } from './dto/update-game-progress.dto'

@ApiTags('Game Progress')
@Controller('game-progress')
export class GameProgressController {
  constructor(private readonly gameProgressService: GameProgressService) {}

  @Put()
  async updateGameProgress(@Body() updateDto: UpdateGameProgressDto): Promise<GameProgress> {
    console.log('Dto', updateDto)
    return await this.gameProgressService.updateGameProgress(updateDto)
  }
}
