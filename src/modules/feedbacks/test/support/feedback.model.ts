import { Feedback } from 'modules/feedbacks/schemas/feedbacks.schema'
import { MockModel } from '../../../../database/test/support/mock.model'
import { feedbackStub } from '../stubs/feedback.stub'

export class FeedbackModel extends MockModel<Feedback> {
  protected entityStub = feedbackStub()
}
