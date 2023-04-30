import { CreateGameDto } from './dto/create-game.dto'
import { Game } from './schemas/game.schema'
import { GamesRepository } from './games.repository'
import { Injectable } from '@nestjs/common'
import { UpdateGameDto } from './dto/update-game.dto'

@Injectable()
export class GamesService {
  constructor(private readonly gamesRepository: GamesRepository) {}

  /**
   *
   * @param createDto
   * @returns Promise<Game>
   * @description Create new game
   */
  async create(createDto: CreateGameDto): Promise<Game> {
    const createdGame = await this.gamesRepository.create(createDto)
    return createdGame
  }

  /**
   *
   * @description Find all games
   * @returns Promise<Game[]> if games are found, otherwise empty array
   */

  async findAll(): Promise<Game[]> {
    return await this.gamesRepository.find({})
  }

  /**
   *
   * @param id
   * @returns Promise<Game> if game is found, otherwise null
   * @description Find game by id
   *
   */
  async findOne(id: string): Promise<Game> {
    return await this.gamesRepository.findOne({ _id: id })
  }

  /**
   *
   * @param id
   * @returns Promise<Game> if game is found, otherwise null
   * @description Delete game by id
   */

  async delete(id: string): Promise<Game> {
    return await this.gamesRepository.findOneAndDelete({ _id: id })
  }

  /**
   *
   * @param id
   * @param updateDto
   * @returns Promise<Game> if game is found, otherwise null
   * @description Update game by id
   */

  async update(id: string, updateDto: UpdateGameDto): Promise<Game> {
    return await this.gamesRepository.findOneAndUpdate({ _id: id }, updateDto)
  }
}
