import { FilterQuery } from 'mongoose'
import { LevelProgress } from '../schema/LevelProgress.schema'
import { LevelProgressModel } from './support/levelProgress.model'
import { Test, TestingModule } from '@nestjs/testing'
import { UsersLevelsProgressRepository } from '../usersLevelsProgress.repository'
import { getModelToken } from '@nestjs/mongoose'
import { levelProgressStub } from './stubs/levelProgress.stub'

describe(' UsersLevelsProgressRepository', () => {
  let repository: UsersLevelsProgressRepository

  describe('Find Operations', () => {
    let levelProgressModel: LevelProgressModel
    let levelProgressFilterQuery: FilterQuery<LevelProgress>

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          UsersLevelsProgressRepository,
          {
            provide: getModelToken(LevelProgress.name),
            useClass: LevelProgressModel,
          },
        ],
      }).compile()

      repository = module.get<UsersLevelsProgressRepository>(UsersLevelsProgressRepository)
      levelProgressModel = module.get<LevelProgressModel>(getModelToken(LevelProgress.name))
      levelProgressFilterQuery = { _id: levelProgressStub()._id }

      jest.clearAllMocks()
    })

    describe('findAll', () => {
      describe('when findAll is called', () => {
        let levelProgress: LevelProgress[]
        beforeEach(async () => {
          jest.spyOn(levelProgressModel, 'find')
          levelProgress = (await repository.find({})) as LevelProgress[]
        })

        test('then it should call the levelProgresModel', () => {
          expect(levelProgressModel.find).toHaveBeenCalledWith({})
        })
      })
    })

    describe('Create Operations', () => {
      beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [
            UsersLevelsProgressRepository,
            {
              provide: getModelToken(LevelProgress.name),
              useClass: LevelProgressModel,
            },
          ],
        }).compile()

        repository = module.get<UsersLevelsProgressRepository>(UsersLevelsProgressRepository)
      })

      describe('create', () => {
        describe('when create is called', () => {
          let levelProgress: LevelProgress
          let entity: LevelProgressModel

          beforeEach(async () => {
            jest.spyOn(LevelProgressModel.prototype, 'save')
            entity = new LevelProgressModel(levelProgressStub())
            levelProgress = await entity.save()
          })

          test('then it should call the LevelProgressModel', () => {
            expect(entity.save).toHaveBeenCalledWith()
          })
        })
      })
    })
  })
})
