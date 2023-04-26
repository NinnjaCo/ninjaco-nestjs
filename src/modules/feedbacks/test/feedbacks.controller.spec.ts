import { Test, TestingModule } from '@nestjs/testing'
import { CreateFeedbackDto } from '../dto/create-feedback.dto'
import { Feedback } from '../schemas/feedbacks.schema'
import { FeedbacksController } from '../feedbacks.controller'
import { FeedbacksService } from '../feedbacks.service'
import { feedbackStub } from './stubs/feedback.stub'

jest.mock('../feedbacks.service')

describe('FeedbacksController', () => {
  let controller: FeedbacksController
  let feedbacksService: FeedbacksService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedbacksController],
      providers: [FeedbacksService],
    }).compile()

    controller = module.get<FeedbacksController>(FeedbacksController)
    feedbacksService = module.get<FeedbacksService>(FeedbacksService)
    jest.clearAllMocks()
  })

  test('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('findAllFeedbacks', () => {
    describe('when findAllFeedbacks is called', () => {
      let feedbacks: Feedback[]

      beforeEach(async () => {
        feedbacks = await controller.findAll()
      })

      test('should call feedbacksService.findAllFeedbacks', () => {
        expect(feedbacksService.findAll).toBeCalled()
      })

      test('should return an array of feedbacks', () => {
        expect(feedbacks).toEqual([feedbackStub()])
      })
    })
  })

  describe('createFeedback', () => {
    describe('when createFeedback is called', () => {
      let feedback: Feedback
      let createFeedbackDto: CreateFeedbackDto

      beforeEach(async () => {
        const { user, course, mission, level, rating, message } = feedbackStub()
        const courseId = course._id
        const missionId = mission._id
        const levelId = level._id
        createFeedbackDto = { courseId, missionId, levelId, rating, message }
        feedback = await controller.create(user._id, createFeedbackDto)
      })

      test('should call feedbacksService.createFeedback', () => {
        expect(feedbacksService.createFeedback).toBeCalledWith(createFeedbackDto)
      })

      test('should return a feedback', () => {
        expect(feedback).toEqual(feedbackStub())
      })
    })
  })
})
