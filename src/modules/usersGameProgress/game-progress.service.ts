import { GameProgress } from './schema/game-progress.schema'
import { GameProgressRepository } from './game-progress.repository'
import { Injectable } from '@nestjs/common'
import { UpdateGameProgressDto } from './dto/update-game-progress.dto'
@Injectable()
export class GameProgressService {
  constructor(private readonly gameProgressRepository: GameProgressRepository) {}

  async updateGameProgress(updateDto: UpdateGameProgressDto): Promise<GameProgress> {
    console.log('all games progress', await this.gameProgressRepository.find({}))
    console.log('hi dto', updateDto)
    console.log('gameId' + updateDto.gameId)
    console.log('userId' + updateDto.userId)
    console.log(
      'game before',
      await this.gameProgressRepository.findOne({
        gameId: updateDto.gameId,
        userId: updateDto.userId,
      })
    )
    await this.gameProgressRepository.findOneAndUpdate(
      { gameId: updateDto.gameId, userId: updateDto.userId },
      updateDto
    )
    console.log(
      'game after',
      await this.gameProgressRepository.findOne({
        gameId: updateDto.gameId,
        userId: updateDto.userId,
      })
    )
    return await this.gameProgressRepository.findOne({
      gameId: updateDto.gameId,
      userId: updateDto.userId,
    })
  }
}
