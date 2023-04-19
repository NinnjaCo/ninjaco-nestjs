import { CreateUserPlayGameDto } from './dto/create-game-progress.dto'
import { Game } from 'modules/games/schemas/game.schema'
import { GameProgress } from 'modules/usersGameProgress/schema/game-progress.schema'
import { GameProgressRepository } from 'modules/usersGameProgress/game-progress.repository'
import { GameProgressService } from 'modules/usersGameProgress/game-progress.service'
import { GamesRepository } from 'modules/games/games.repository'
import { GamesService } from 'modules/games/games.service'
import { Injectable } from '@nestjs/common'
import { UpdateUserPlayGameDto } from './dto/update-user-play-game.dto'
import { UserPlayGame } from './schemas/userPlayGame.schema'
import { UsersPlayGamesRepository } from './usersPlayGames.repository'
import { UsersService } from 'modules/users/users.service'

@Injectable()
export class UsersPlayGamesService {
  constructor(
    private readonly usersPlayGamesRepository: UsersPlayGamesRepository,
    private readonly gamesService: GamesService,
    private readonly gamesRepository: GamesRepository,
    private readonly gameProgressRepository: GameProgressRepository,
    private readonly usersService: UsersService
  ) {}

  async createUserPlayGameEntry(createGameDto: CreateUserPlayGameDto): Promise<UserPlayGame> {
    const gameProgress = await this.gameProgressRepository.create(createGameDto)
    const game = await this.gamesService.findOne(createGameDto.gameId)
    const user = await this.usersService.findOne(createGameDto.userId)
    const userPlayGame = await this.usersPlayGamesRepository.create({
      game: game,
      user: user,
      gameProgress: gameProgress,
      completed: false,
      startedAt: new Date().toISOString(),
    })
    return userPlayGame
  }

  async getCompletedGames(userId: string) {
    console.log('userId', userId)
    const games = await this.gamesRepository.find({})
    console.log('games', games)

    const newGames: (Game | UserPlayGame)[] = []
    for (const game of games) {
      const userPlayGame = await this.usersPlayGamesRepository.findOne({
        game: game._id,
        user: userId,
      })
      if (userPlayGame) {
        console.log('userPlayGame', userPlayGame)
        newGames.push(userPlayGame)
      } else {
        console.log('game', game)
        newGames.push(game)
      }
    }
    console.log('newGames', newGames)
    return newGames
  }

  async updateGameProgress(updateDto: UpdateUserPlayGameDto): Promise<UserPlayGame> {
    await this.usersPlayGamesRepository.findOneAndUpdate({ game: updateDto.gameId }, updateDto)
    return this.usersPlayGamesRepository.findOne({ game: updateDto.gameId })
  }
}
