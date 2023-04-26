import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { FilterQuery } from 'mongoose'
import { Feedback } from '../schemas/feedbacks.schema'
import { FeedbacksRepository } from '../feedbacks.repository'
import { feedbackStub } from './stubs/feedback.stub'
import { FeedbackModel } from './support/feedback.model'

describe('FeedbacksRepository', () => {
  let repository: FeedbacksRepository

  describe('Find Operations', () => {
    let feedbackModel: FeedbackModel
    let feedbackFilterQuery: FilterQuery<Feedback>

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          FeedbacksRepository,
          {
            provide: getModelToken(Feedback.name),
            useClass: FeedbackModel,
          },
        ],
      }).compile()

      repository = module.get<FeedbacksRepository>(FeedbacksRepository)
      feedbackModel = module.get<FeedbackModel>(getModelToken(Feedback.name))
      feedbackFilterQuery = { _id: feedbackStub()._id }

      jest.clearAllMocks()
    })

    describe('findAll', () => {
      describe('when findAll is called', () => {
        let feedbacks: Feedback[]

        beforeEach(async () => {
          jest.spyOn(feedbackModel, 'find')
          feedbacks = (await repository.find({})) as Feedback[]
        })

        test('then it should call the feedbackModel', () => {
          expect(feedbackModel.find).toHaveBeenCalledWith({})
        })

        test('then it should return a user', () => {
          expect(feedbacks).toEqual([feedbackStub()])
        })
      })
    })

    describe('Create Operations', () => {
      beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [
            FeedbacksRepository,
            {
              provide: getModelToken(Feedback.name),
              useClass: FeedbackModel,
            },
          ],
        }).compile()

        repository = module.get<FeedbacksRepository>(FeedbacksRepository)
      })

      describe('create', () => {
        describe('when create is called', () => {
          let feedback: Feedback
          let entity: FeedbackModel

          beforeEach(async () => {
            jest.spyOn(FeedbackModel.prototype, 'save')
            entity = new FeedbackModel(feedbackStub())
            feedback = await entity.save()
          })

          test('then it should call the feedbackModel', () => {
            expect(entity.save).toHaveBeenCalledWith()
          })

          test('then it should return a user', () => {
            expect(feedback).toEqual(feedbackStub())
          })
        })
      })
    })
  })
})
