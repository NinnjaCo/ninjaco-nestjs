import { getModelToken } from '@nestjs/mongoose'
import { TestingModule, Test } from '@nestjs/testing'
import { FeedbacksRepository } from 'modules/feedbacks/feedbacks.repository'
import { Feedback } from 'modules/feedbacks/schemas/feedbacks.schema'
import { feedbackStub } from 'modules/feedbacks/test/stubs/feedback.stub'
import { FeedbackModel } from 'modules/feedbacks/test/support/feedback.model'
import { FilterQuery } from 'mongoose'
import { GamesRepository } from '../games.repository'
import { Game } from '../schemas/game.schema'
import { GamesModel } from './support/game.model'
import { gameStub } from './stubs/game.stub'

describe('GamesRepository', () => {
  let repository: GamesRepository

  describe('Find Operations', () => {
    let gameModel: GamesModel
    let gameFilterQuery: FilterQuery<Game>

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          GamesRepository,
          {
            provide: getModelToken(Game.name),
            useClass: GamesModel,
          },
        ],
      }).compile()

      repository = module.get<GamesRepository>(GamesRepository)
      gameModel = module.get<GamesModel>(getModelToken(Game.name))
      gameFilterQuery = { _id: feedbackStub()._id }

      jest.clearAllMocks()
    })

    describe('findAll', () => {
      describe('when findAll is called', () => {
        let games: Game[]
        beforeEach(async () => {
          jest.spyOn(gameModel, 'find')
          games = (await repository.find({})) as Game[]
        })

        test('then it should call the gameModel', () => {
          expect(gameModel.find).toHaveBeenCalledWith({})
        })
      })
    })

    describe('Create Operations', () => {
      beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [
            GamesRepository,
            {
              provide: getModelToken(Game.name),
              useClass: GamesModel,
            },
          ],
        }).compile()

        repository = module.get<GamesRepository>(GamesRepository)
      })

      describe('create', () => {
        describe('when create is called', () => {
          let game: Game
          let entity: GamesModel

          beforeEach(async () => {
            jest.spyOn(GamesModel.prototype, 'save')
            entity = new GamesModel(gameStub())
            game = await entity.save()
          })

          test('then it should call the gameModel', () => {
            expect(entity.save).toHaveBeenCalledWith()
          })
        })
      })
    })
  })
})
