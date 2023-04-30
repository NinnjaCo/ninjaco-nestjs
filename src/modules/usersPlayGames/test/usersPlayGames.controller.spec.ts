import { CreateUserPlayGameDto } from '../dto/create-user-play-game.dto'
import { Game } from 'modules/games/schemas/game.schema'
import { Test, TestingModule } from '@nestjs/testing'
import { UserPlayGame } from '../schemas/userPlayGame.schema'
import { UsersPlayGamesController } from '../usersPlayGames.controller'
import { UsersPlayGamesService } from '../usersPlayGames.service'
import { userPlayGameStub } from './stubs/userPlayGame.stub'

jest.mock('../usersPlayGames.service')

describe('UsersPlayGamesController', () => {
  let controller: UsersPlayGamesController
  let usersPlayGamesService: UsersPlayGamesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersPlayGamesController],
      providers: [UsersPlayGamesService],
    }).compile()

    controller = module.get<UsersPlayGamesController>(UsersPlayGamesController)
    usersPlayGamesService = module.get<UsersPlayGamesService>(UsersPlayGamesService)
    jest.clearAllMocks()
  })

  test('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('findAllUsersPlayGames', () => {
    describe('when findAllUsersPlayGames is called', () => {
      let usersPlayGames: (UserPlayGame | Game)[]
      const { user } = userPlayGameStub()

      beforeEach(async () => {
        usersPlayGames = await controller.getCompletedGames(user._id.toString())
      })

      test('should call usersPlayGamesService.findAllUsersPlayGames', () => {
        expect(usersPlayGamesService.getCompletedGames).toBeCalled()
      })

      test('should return an array of usersPlayGames', () => {
        expect(usersPlayGames).toEqual([userPlayGameStub()])
      })
    })
  })

  describe('createUserPlayGame', () => {
    describe('when createUserPlayGame is called', () => {
      let userPlayGame: UserPlayGame
      let createUserPlayGameDto: CreateUserPlayGameDto

      beforeEach(async () => {
        const { user, game } = userPlayGameStub()
        createUserPlayGameDto = {
          userId: user._id.toString(),
          gameId: game._id.toString(),
        }
        userPlayGame = await controller.userPlayGameEntry(createUserPlayGameDto)
      })

      test('should call usersPlayGamesService.createUserPlayGame', () => {
        expect(usersPlayGamesService.createUserPlayGameEntry).toBeCalled()
      })

      test('should return a userPlayGame', () => {
        expect(userPlayGame).toEqual(userPlayGameStub())
      })
    })
  })
})
