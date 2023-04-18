import { CreateGameDto } from './dto/create-game.dto'
import { Game } from './schemas/game.schema'
import { GameProgress } from '../games-enrollment/schemas/game-progress.schema'
import { GamesProgessRepository } from '../games-enrollment/games-progress.repository'
import { GamesRepository } from './games.repository'
import { Injectable } from '@nestjs/common'
import { PlayGameDto } from '../games-enrollment/dto/play-game.dto'
import { UpdateGameDto } from './dto/update-game.dto'
import { UpdatePlayGameDto } from '../games-enrollment/dto/update-play-game.dto'
import { UserPlayGame } from '../games-enrollment/schemas/user-play-game.schema'
import { UsersPlayGamesRepository } from '../games-enrollment/users-play-games.repository'
@Injectable()
export class GamesService {
  constructor(
    private readonly gamesRepository: GamesRepository,
    private readonly usersPlayGamesRepository: UsersPlayGamesRepository,
    private readonly gameProgressRepository: GamesProgessRepository
  ) {}

  async create(createDto: CreateGameDto): Promise<Game> {
    const createdGame = await this.gamesRepository.create(createDto)
    return createdGame
  }

  async findAll(): Promise<Game[]> {
    return await this.gamesRepository.find({})
  }

  async findOne(id: string): Promise<Game> {
    return await this.gamesRepository.findOne({ _id: id })
  }

  async delete(id: string): Promise<Game> {
    return await this.gamesRepository.findOneAndDelete({ _id: id })
  }

  async update(id: string, updateDto: UpdateGameDto): Promise<Game> {
    return await this.gamesRepository.findOneAndUpdate({ _id: id }, updateDto)
  }
}
