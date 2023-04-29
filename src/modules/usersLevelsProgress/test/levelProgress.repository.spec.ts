import { getModelToken } from '@nestjs/mongoose'
import { TestingModule, Test } from '@nestjs/testing'
import { feedbackStub } from 'modules/feedbacks/test/stubs/feedback.stub'
import { GamesRepository } from 'modules/games/games.repository'
import { Game } from 'modules/games/schemas/game.schema'
import { gameStub } from 'modules/games/test/stubs/game.stub'
import { GamesModel } from 'modules/games/test/support/game.model'
import { FilterQuery } from 'mongoose'
import { LevelProgress } from '../schema/LevelProgress.schema'
import { UsersLevelsProgressRepository } from '../usersLevelsProgress.repository'
import { LevelProgressModel } from './support/levelProgress.model'
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

    // describe('Create Operations', () => {
    //   beforeEach(async () => {
    //     const module: TestingModule = await Test.createTestingModule({
    //       providers: [
    //         GamesRepository,
    //         {
    //           provide: getModelToken(Game.name),
    //           useClass: GamesModel,
    //         },
    //       ],
    //     }).compile()

    //     repository = module.get<GamesRepository>(GamesRepository)
    //   })

    //   describe('create', () => {
    //     describe('when create is called', () => {
    //       let game: Game
    //       let entity: GamesModel

    //       beforeEach(async () => {
    //         jest.spyOn(GamesModel.prototype, 'save')
    //         entity = new GamesModel(gameStub())
    //         game = await entity.save()
    //       })

    //       test('then it should call the gameModel', () => {
    //         expect(entity.save).toHaveBeenCalledWith()
    //       })
    //     })
    //   })
    // })
  })
})
