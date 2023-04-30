import { CreateGameProgressDto } from '../dto/create-game-progress.dto'
import { GameProgress } from '../schema/game-progress.schema'
import { GameProgressController } from '../game-progress.controller'
import { GameProgressService } from '../game-progress.service'
import { Test, TestingModule } from '@nestjs/testing'
import { UpdateGameProgressDto } from '../dto/update-game-progress.dto'
import { gameProgressService } from '../__mocks__/usersGameProgress.service'
import { gameProgressStub } from './stubs/usersGameProgress.stub'

jest.mock('../usersGameProgress.service')

describe('UsersGameProgressController', () => {
  let controller: GameProgressController
  let gameProgressService: GameProgressService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameProgressController],
      providers: [GameProgressService],
    }).compile()

    controller = module.get<GameProgressController>(GameProgressController)
    gameProgressService = module.get<GameProgressService>(GameProgressService)
    jest.clearAllMocks()
  })

  test('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('updateUserGameProgress', () => {
    describe('when updateUserGameProgress is called', () => {
      let userGameProgress: GameProgress
      let updateUserPlayGameDto: UpdateGameProgressDto
      let userId: string

      beforeEach(async () => {
        const { userId, gameId, progress } = gameProgressStub()
        updateUserPlayGameDto = {
          progress: progress,
        }
        userGameProgress = await controller.updateGameProgress(
          gameProgressStub()._id.toString(),
          updateUserPlayGameDto
        )
      })
    })
  })

  describe('findUserGameProgress', () => {
    describe('when finsUserGameProgress is called', () => {
      let userGameProgress: GameProgress
      const { userId, gameId } = gameProgressStub()

      test('should call gameProgressService.findUserGameProgress', () => {
        expect(gameProgressService.getGameProgress).toBeCalled()
      })

      test('should return a userGameProgress', () => {
        expect(userGameProgress).toEqual([gameProgressStub()])
      })
    })
  })

  describe('createUserGameProgress', () => {
    describe('when createUserGameProgress is called', () => {
      let userGameProgress: GameProgress
      let createUserPlayGameDto: CreateGameProgressDto
      let userId: string

      test('should call gameProgressService.createGameProgress', () => {
        expect(gameProgressService.create).toBeCalled()
      })

      test('should return a userGameProgress', () => {
        expect(userGameProgress).toEqual(gameProgressStub())
      })
    })
  })
})
