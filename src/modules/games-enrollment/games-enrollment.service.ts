import { CreateGameProgressDto } from './dto/create-game-progress.dto'
import { GameProgress } from './schemas/game-progress.schema'
import { GamesProgessRepository } from './games-progress.repository'
import { GamesRepository } from 'modules/games/games.repository'
import { Injectable } from '@nestjs/common'
import { UpdateGameProgressDto } from './dto/update-game-progress.dto'
import { UserPlayGame } from './schemas/user-play-game.schema'
import { UsersPlayGamesRepository } from './users-play-games.repository'

@Injectable()
export class GamesEnrollmentService {
  constructor(
    private readonly usersPlayGamesRepository: UsersPlayGamesRepository,
    private readonly gameProgressRepository: GamesProgessRepository,
    private readonly gamesRepository: GamesRepository
  ) {}

  async createGameProgress(playDto: CreateGameProgressDto): Promise<GameProgress> {
    const gameProgress = this.gameProgressRepository.create(playDto)
    // const gameProgress = new GameProgress()
    // gameProgress.gameId = playDto.gameId
    // gameProgress.userId = playDto.userId
    // gameProgress.progress = playDto.progress
    // const userPlayGame = this.usersPlayGamesRepository.create({playDto.gameId, playDto.userId, gameProgress._id.toString()})
    const userPlayGame = new UserPlayGame()
    userPlayGame.gameId = playDto.gameId
    userPlayGame.userId = playDto.userId
    userPlayGame.gameProgressId = gameProgress._id.toString()
    userPlayGame.completed = false
    userPlayGame.startedAt = new Date().toISOString()
    return gameProgress
  }

  async getCompletedGames() {
    const games = await this.gamesRepository.find({})
    const newGames = []
    games.forEach(async (game) => {
      const userPlayGame = await this.usersPlayGamesRepository.findOne({ gameId: game._id })
      console.log(userPlayGame)
      if (userPlayGame && userPlayGame.completed) {
        newGames.push({ ...game, completed: true })
      } else {
        newGames.push({ ...game, completed: false })
      }
    })
    return newGames
  }

  async updateGameProgress(updateDto: UpdateGameProgressDto): Promise<GameProgress> {
    await this.gameProgressRepository.findOneAndUpdate({ _id: updateDto.gameId }, updateDto)
    return this.gameProgressRepository.findOne({ _id: updateDto.gameId })
  }
}
