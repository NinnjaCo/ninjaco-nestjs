import { CreateGameDto } from './dto/create-game.dto'
import { Game } from './schemas/game.schema'
import { GameProgress } from './schemas/game-progress.schema'
import { GamesRepository } from './games.repository'
import { Injectable } from '@nestjs/common'
import { PlayGameDto } from './dto/play-game.dto'
import { UpdateGameDto } from './dto/update-game.dto'
import { UserPlayGame } from './schemas/user-play-game.schema'

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
  async play(playDto: PlayGameDto): Promise<GameProgress> {
    const gameProgress = new GameProgress()
    gameProgress.gameId = playDto.gameId
    gameProgress.userId = playDto.userId
    gameProgress.progress = playDto.progress
    const userPlayGame = new UserPlayGame()
    userPlayGame.gameId = playDto.gameId
    userPlayGame.userId = playDto.userId
    userPlayGame.gameProgressId = gameProgress._id.toString()
    return gameProgress
  }

  async getCompletedGames(): Promise<Game[]> {
    return await this.gamesRepository.find({ isCompleted: true })
  }
}
