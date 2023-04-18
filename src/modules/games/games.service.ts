import { CreateGameDto } from './dto/create-game.dto'
import { Game } from './schemas/game.schema'
import { GamesRepository } from './games.repository'
import { Injectable } from '@nestjs/common'
import { UpdateGameDto } from './dto/update-game.dto'

@Injectable()
export class GamesService {
  constructor(private readonly gamesRepository: GamesRepository) {}

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
