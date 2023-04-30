import { FilterQuery } from 'mongoose'
import { GameProgress } from '../schema/game-progress.schema'
import { GameProgressModel } from './support/userGameProgress.model'
import { GameProgressRepository } from '../game-progress.repository'
import { Test, TestingModule } from '@nestjs/testing'
import { gameProgressStub } from './stubs/usersGameProgress.stub'
import { getModelToken } from '@nestjs/mongoose'

describe('UsersPlayGamesRepository', () => {
  let repository: GameProgressRepository

  describe('Find Operations', () => {
    let gameProgressModel: GameProgressModel
    let gameProgressFilterQuery: FilterQuery<GameProgress>

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          GameProgressRepository,
          {
            provide: getModelToken(GameProgress.name),
            useClass: GameProgressModel,
          },
        ],
      }).compile()

      repository = module.get<GameProgressRepository>(GameProgressRepository)
      gameProgressModel = module.get<GameProgressModel>(getModelToken(GameProgress.name))
      gameProgressFilterQuery = { _id: gameProgressStub()._id }

      jest.clearAllMocks()
    })

    describe('findOne', () => {
      describe('when findOne is called', () => {
        let gameProgress: GameProgress

        beforeEach(async () => {
          jest.spyOn(gameProgressModel, 'findOne')
          gameProgress = (await gameProgressModel
            .findOne(gameProgressFilterQuery)
            .exec()) as GameProgress
        })

        test('then it should call the gameProgressModel', () => {
          expect(gameProgressModel.find).toHaveBeenCalledWith({})
        })

        test('then it should return a user', () => {
          expect(gameProgress).toEqual([gameProgressStub()])
        })
      })
    })

    describe('Create Operations', () => {
      beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [
            GameProgressRepository,
            {
              provide: getModelToken(GameProgress.name),
              useClass: GameProgressModel,
            },
          ],
        }).compile()

        repository = module.get<GameProgressRepository>(GameProgressRepository)
      })

      describe('create', () => {
        describe('when create is called', () => {
          let gameProgress: GameProgress
          let entity: GameProgressModel

          beforeEach(async () => {
            jest.spyOn(GameProgressModel.prototype, 'save')
            entity = new GameProgressModel(gameProgressStub())
            gameProgress = await entity.save()
          })

          test('then it should call the userPlayGameModel', () => {
            expect(entity.save).toHaveBeenCalledWith()
          })

          test('then it should return a user', () => {
            expect(gameProgress).toEqual(gameProgressStub())
          })
        })
      })
    })
  })
})
