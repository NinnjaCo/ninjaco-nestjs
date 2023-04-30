import { Level } from 'modules/courses/schemas/level.schema'
import { Mission } from 'modules/courses/schemas/mission.schema'
import { MockModel } from '../../../../database/test/support/mock.model'
import { levelStub } from '../stubs/level.stub'

export class LevelModel extends MockModel<Level> {
  protected entityStub = levelStub()
}
