import { LevelProgress } from 'modules/usersLevelsProgress/schema/LevelProgress.schema'
import { MockModel } from 'database/test/support/mock.model'
import { levelProgressStub } from '../stubs/levelProgress.stub'

export class LevelProgressModel extends MockModel<LevelProgress> {
  protected entityStub = levelProgressStub()
}
