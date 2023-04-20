import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { CreateUserPlayGameDto } from './dto/create-user-play-game.dto'
import { Game } from '../games/schemas/game.schema'
import { GameProgressService } from '../usersGameProgress/game-progress.service'
import { GamesService } from '../games/games.service'
import { MongoServerError } from 'mongodb'
import { UpdateUserPlayGameDto } from './dto/update-user-play-game.dto'
import { UserPlayGame } from './schemas/userPlayGame.schema'
import { UsersPlayGamesRepository } from './usersPlayGames.repository'
import { UsersService } from '../users/users.service'
import { handleMongoDuplicateKeyError } from '../../common/shared'

@Injectable()
export class UsersPlayGamesService {
  constructor(
    private readonly usersPlayGamesRepository: UsersPlayGamesRepository,
    private readonly gamesService: GamesService,
    private readonly gameProgressService: GameProgressService,
    private readonly usersService: UsersService
  ) {}

  /**
   * Create a new user play game entry with its corresponding game progress
   * @param createGameDto
   * @returns {Promise<UserPlayGame>}
   * @throws {InternalServerErrorException}
   * @throws {BadRequestException}
   */
  async createUserPlayGameEntry(createGameDto: CreateUserPlayGameDto): Promise<UserPlayGame> {
    const game = await this.gamesService.findOne(createGameDto.gameId)
    const user = await this.usersService.findOne(createGameDto.userId)

    if (!game || !user) {
      throw new BadRequestException('Incorrect game or user id')
    }

    const gameProgress = await this.gameProgressService.create({
      userId: createGameDto.userId,
      gameId: createGameDto.gameId,
      progress: '',
    })

    if (!gameProgress) {
      throw new InternalServerErrorException('Could not create game progress')
    }

    try {
      return await this.usersPlayGamesRepository.create({
        game: game,
        user: user,
        gameProgress: gameProgress,
        completed: false,
        startedAt: new Date().toISOString(),
      })
    } catch (error) {
      // if error type is from mongodb
      if (error instanceof MongoServerError) {
        // This will automatically throw a BadRequestException with the duplicate key error message
        handleMongoDuplicateKeyError(error)
      } else {
        throw new InternalServerErrorException(error)
      }
    }
  }

  /**
   * Get all games and augment them with extra information if the user has played them
   * @param userId
   * @returns {Promise<(Game | UserPlayGame)[]>}
   * @throws {InternalServerErrorException}
   * @throws {BadRequestException}
   */
  async getCompletedGames(userId: string) {
    const games = await this.gamesService.findAll()

    const newGames: (Game | UserPlayGame)[] = []
    for (const game of games) {
      const userPlayGame = await this.usersPlayGamesRepository.findOne({
        game: game._id,
        user: userId,
      })

      console.log('userPlayGame', userPlayGame)
      if (userPlayGame) {
        newGames.push(userPlayGame)
      } else {
        newGames.push(game)
      }
    }

    return newGames
  }

  /**
   * Update user play game entry, i.e. completed status
   * @param id
   * @param updateDto
   * @returns {Promise<UserPlayGame>}
   */
  async updateUserPlayGame(id: string, updateDto: UpdateUserPlayGameDto): Promise<UserPlayGame> {
    return await this.usersPlayGamesRepository.findOneAndUpdate({ _id: id }, updateDto)
  }

  /**
   * Get user play game entry by id
   * @param id
   * @returns {Promise<UserPlayGame>}
   * @throws {BadRequestException}
   * @throws {InternalServerErrorException}
   */
  async getUserPlayGameEntry(id: string): Promise<UserPlayGame> {
    const userPlayGame = await this.usersPlayGamesRepository.findOne({ _id: id })

    if (!userPlayGame) {
      throw new BadRequestException('User play game entry not found')
    }

    return userPlayGame
  }
}
