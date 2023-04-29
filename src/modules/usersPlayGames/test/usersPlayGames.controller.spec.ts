import { Test, TestingModule } from '@nestjs/testing'
import { UsersPlayGamesController } from '../usersPlayGames.controller'
import { UsersPlayGamesService } from '../usersPlayGames.service'
import { UserPlayGame } from '../schemas/userPlayGame.schema'
import { CreateUserPlayGameDto } from '../dto/create-user-play-game.dto'

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
      let usersPlayGames: UserPlayGame[]

      beforeEach(async () => {
        usersPlayGames = await controller.findAll()
      })

      test('should call usersPlayGamesService.findAllUsersPlayGames', () => {
        expect(usersPlayGamesService.findAll).toBeCalled()
      })

      test('should return an array of usersPlayGames', () => {
        expect(usersPlayGames).toEqual([feedbackStub()])
      })
    })
  })

  describe('createUserPlayGame', () => {
    describe('when createUserPlayGame is called', () => {
      let userPlayGame: UserPlayGame
      let createUserPlayGameDto: CreateUserPlayGameDto
      let userId: string

      beforeEach(async () => {
        const { user, course, mission, level, rating, message } = feedbackStub()
        const courseId = course._id
        const missionId = mission._id
        const levelId = level._id
        userId = user._id.toString()
        createUserPlayGameDto = {
          userId: userId.toString(),
          gameId: gameId.toString(),
        }
        userPlayGame = await controller.create(userId, createUserPlayGameDto)
      })

      test('should call usersPlayGamesService.createUserPlayGame', () => {
        expect(usersPlayGamesService.createUserPlayGame).toBeCalledWith(
          userId,
          createUserPlayGameDto
        )
      })

      test('should return a userPlayGame', () => {
        expect(userPlayGame).toEqual(feedbackStub())
      })
    })
  })
})
