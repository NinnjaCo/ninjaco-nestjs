import { ApiTags } from '@nestjs/swagger'
import { Body, Controller, Param, Put } from '@nestjs/common'
import { GameProgress } from './schema/game-progress.schema'
import { GameProgressService } from './game-progress.service'
import { UpdateGameProgressDto } from './dto/update-game-progress.dto'

@ApiTags('Game Progress')
@Controller('game-progress')
export class GameProgressController {
  constructor(private readonly gameProgressService: GameProgressService) {}

  @Put(':id')
  async updateGameProgress(
    @Param('id') id: string,
    @Body() updateDto: UpdateGameProgressDto
  ): Promise<GameProgress> {
    return await this.gameProgressService.updateGameProgress(id, updateDto)
  }
}
