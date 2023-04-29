import { GamesService } from 'modules/games/games.service'
import { Test, TestingModule } from '@nestjs/testing'
import { UsersLevelsProgressController } from '../usersLevelsProgress.controller'
import { UsersLevelsProgressService } from '../usersLevelsProgress.service'
import { gameStub } from 'modules/games/test/stubs/game.stub'
import { LevelProgress } from '../schema/LevelProgress.schema'
import { levelProgressStub } from './stubs/levelProgress.stub'

jest.mock('../levelProgress.service')

describe('UsersLevelsProgressController', () => {
  let controller: UsersLevelsProgressController
  let levelProgressService: UsersLevelsProgressService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersLevelsProgressController],
      providers: [UsersLevelsProgressService],
    }).compile()

    controller = module.get<UsersLevelsProgressController>(UsersLevelsProgressController)
    levelProgressService = module.get<UsersLevelsProgressService>(UsersLevelsProgressService)
    jest.clearAllMocks()
  })

  test('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('findAllLevelProgress', () => {
    describe('when findAllLevelProgress is called', () => {
      let levelProgress: LevelProgress[]

      beforeEach(async () => {
        levelProgress = await controller.findAll()
      })

      test('should call LevelProgressService.findAllLevelProgress', () => {
        expect(levelProgressService.findAll).toBeCalled()
      })

      test('should return an array of levelProgress', () => {
        expect(levelProgress).toEqual([levelProgressStub()])
      })
    })
  })

  //   describe('createGame', () => {
  //     describe('when createGame is called', () => {
  //       let game: Game
  //       let CreateGameDto: CreateGameDto

  //       beforeEach(async () => {
  //         const {
  //           title,
  //           image,
  //           playerDirection,
  //           numOfBlocks,
  //           sizeOfGrid,
  //           playerLocation,
  //           goalLocation,
  //           wallsLocations,
  //         } = gameStub()

  //         CreateGameDto = {
  //           title,
  //           image,
  //           playerDirection,
  //           numOfBlocks,
  //           sizeOfGrid,
  //           playerLocation,
  //           goalLocation,
  //           wallsLocations,
  //         }

  //         game = await controller.create(CreateGameDto)
  //       })

  //       test('should call gamesService.createGame', () => {
  //         expect(gamesService.create).toBeCalledWith(CreateGameDto)
  //       })

  //       test('should return a game', () => {
  //         expect(game).toEqual(gameStub())
  //       })
  //     })
  //   })
})
