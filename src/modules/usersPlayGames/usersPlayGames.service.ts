import { CreateGameProgressDto } from './dto/create-game-progress.dto'
import { GameProgress } from 'modules/usersGameProgress/schema/game-progress.schema'
import { GameProgressRepository } from 'modules/usersGameProgress/game-progress.repository'
import { GameProgressService } from 'modules/usersGameProgress/game-progress.service'
import { GamesRepository } from 'modules/games/games.repository'
import { GamesService } from 'modules/games/games.service'
import { Injectable } from '@nestjs/common'
import { UpdateGameProgressDto } from './dto/update-game-progress.dto'
import { UserPlayGame } from './schemas/userPlayGame.schema'
import { UsersPlayGamesRepository } from './usersPlayGames.repository'
import { UsersService } from 'modules/users/users.service'
@Injectable()
export class UsersPlayGamesService {
  constructor(
    private readonly usersPlayGamesRepository: UsersPlayGamesRepository,
    private readonly gamesService: GamesService,
    private readonly gamesRepository: GamesRepository,
    private readonly gameProgressService: GameProgressService,
    private readonly gameProgressRepository: GameProgressRepository,
    private readonly usersService: UsersService
  ) {}

  async createUserPlayGameEntry(createGameDto: CreateGameProgressDto): Promise<GameProgress> {
    const gameProgress = await this.gameProgressRepository.createGameProgressEntry(createGameDto)
    const game = await this.gamesService.findOne(createGameDto.gameId)
    const user = await this.usersService.findOne(createGameDto.userId)
    const userPlayGame = await this.usersPlayGamesRepository.create({
      game: game,
      user: user,
      gameProgressId: gameProgress._id.toString(),
      completed: false,
      startedAt: new Date().toISOString(),
    })
    return gameProgress
  }

  async getCompletedGames() {
    const games = await this.gamesRepository.find({})
    const newGames = []
    for (const game of games) {
      const userPlayGame = await this.usersPlayGamesRepository.findOne({ game: game._id })
      if (userPlayGame && userPlayGame.completed) {
        newGames.push({ ...game, completed: true })
      } else {
        newGames.push({ ...game, completed: false })
      }
    }
    return newGames
  }

  async updateGameProgress(updateDto: UpdateGameProgressDto): Promise<GameProgress> {
    await this.gameProgressRepository.findOneAndUpdate({ gameId: updateDto.gameId }, updateDto)
    return this.gameProgressRepository.findOne({ gameId: updateDto.gameId })
  }
}
