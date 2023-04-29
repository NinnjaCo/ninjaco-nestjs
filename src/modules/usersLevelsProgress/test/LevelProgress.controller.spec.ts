import { CreateLevelProgressDto } from '../dto/create-levelProgress.dto'
import { GamesService } from 'modules/games/games.service'
import { LevelProgress } from '../schema/LevelProgress.schema'
import { Test, TestingModule } from '@nestjs/testing'
import { UsersLevelsProgressController } from '../usersLevelsProgress.controller'
import { UsersLevelsProgressService } from '../usersLevelsProgress.service'
import { gameStub } from 'modules/games/test/stubs/game.stub'
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

  describe('createLevelProgress', () => {
    describe('when createLevelProgress is called', () => {
      let levelProgress: LevelProgress
      let createLevelProgressDto: CreateLevelProgressDto

      beforeEach(async () => {
        const { levelId, userId, courseId, missionId, progress } = levelProgressStub()

        createLevelProgressDto = {
          levelId,
          userId,
          courseId,
          missionId,
          progress,
        }

        levelProgress = await controller.create(createLevelProgressDto)
      })

      test('should call LevelProgresService.createLevelProgress', () => {
        expect(levelProgressService.createLevelProgress).toBeCalledWith(createLevelProgressDto)
      })

      test('should return a levelProgress', () => {
        expect(levelProgress).toEqual(levelProgressStub())
      })
    })
  })
})
