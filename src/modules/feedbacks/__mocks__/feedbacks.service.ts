import { feedbackStub } from '../test/stubs/feedback.stub'

export const FeedbacksService = jest.fn().mockReturnValue({
  findAll: jest.fn().mockResolvedValue([feedbackStub()]),
  createFeedback: jest.fn().mockResolvedValue(feedbackStub()),
})
