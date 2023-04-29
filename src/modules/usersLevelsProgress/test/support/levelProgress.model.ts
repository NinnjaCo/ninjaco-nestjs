import { LevelProgress } from 'modules/usersLevelsProgress/schema/LevelProgress.schema'
import { MockModel } from 'database/test/support/mock.model'

export class LevelProgressModel extends MockModel<LevelProgress> {
  protected entityStub = levelProgressStub()
}
