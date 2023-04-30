import { Course } from '../../../courses/schemas/course.schema'
import { Mission } from 'modules/courses/schemas/mission.schema'
import { MockModel } from '../../../../database/test/support/mock.model'
import { courseStub } from '../stubs/course.stub'
import { missionStub } from '../stubs/mission.stub'

export class MissionModel extends MockModel<Mission> {
  protected entityStub = missionStub()
}
