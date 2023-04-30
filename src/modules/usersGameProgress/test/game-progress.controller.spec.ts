import { GameProgress } from '../schema/game-progress.schema'
import { GameProgressController } from '../game-progress.controller'
import { GameProgressService } from '../game-progress.service'
import { Test, TestingModule } from '@nestjs/testing'
import { UpdateGameProgressDto } from '../dto/update-game-progress.dto'
import { gameProgressStub } from './stubs/usersGameProgress.stub'

jest.mock('../game-progress.service')

describe('GameProgressController', () => {
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

  describe('upadteGameProgress', () => {
    describe('when updateGameProgress is called', () => {
      let gameProgress: GameProgress
      let updateGameProgressDto: UpdateGameProgressDto

      beforeEach(async () => {
        gameProgress = gameProgressStub()
        updateGameProgressDto = {
          progress: '1',
        }

        jest.spyOn(gameProgressService, 'updateGameProgress')

        await controller.updateGameProgress(gameProgress._id.toString(), updateGameProgressDto)
      })

      test('then it should call gameProgressService', () => {
        expect(gameProgressService.updateGameProgress).toHaveBeenCalledWith(
          gameProgress._id.toString(),
          updateGameProgressDto
        )
      })

      test('then it should return a game progress', () => {
        expect(gameProgress).toEqual(gameProgressStub())
      })
    })
  })
})
