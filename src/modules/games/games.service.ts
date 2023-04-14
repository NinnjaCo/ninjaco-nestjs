import { CreateGamesDto } from './schemas/dto/create-game.dto'
import { Game } from './schemas/game.schema'
import { Injectable } from '@nestjs/common'

@Injectable()
export class GamesService {
  GamesRepository: any
  constructor() {}
  async create(createDto: CreateGamesDto): Promise<Game> {
    const createdGame = await this.GamesRepository.create(createDto)
    return createdGame
  }
}
