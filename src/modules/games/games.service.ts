import { CreateGamesDto } from './schemas/dto/create-game.dto'
import { Game } from './schemas/game.schema'
import { GamesRepository } from './games.rpeository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class GamesService {
  constructor(private readonly gamesRepository: GamesRepository) {}
  async create(createDto: CreateGamesDto): Promise<Game> {
    const createdGame = await this.gamesRepository.create(createDto)
    return createdGame
  }
}
