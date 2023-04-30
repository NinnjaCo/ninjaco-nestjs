import { MissionManagement } from '../../schemas/MissionManagement.schema'
import { MockModel } from '../../../../database/test/support/mock.model'
import { missionEnrollmentStub } from '../stubs/missionEnrollment.stub'

export class MissionEnrollmentModel extends MockModel<MissionManagement> {
  protected entityStub = missionEnrollmentStub()
}
