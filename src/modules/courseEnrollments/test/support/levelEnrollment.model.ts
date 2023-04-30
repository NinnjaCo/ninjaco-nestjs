import { LevelManagement } from 'modules/courseEnrollments/schemas/LevelManagement.schema'
import { MockModel } from '../../../../database/test/support/mock.model'
import { levelEnrollmentStub } from '../stubs/levelEnrollment.stub'

export class LevelEnrollmentModel extends MockModel<LevelManagement> {
  protected entityStub = levelEnrollmentStub()
}
