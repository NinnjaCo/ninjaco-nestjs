import { GameProgress } from 'modules/usersGameProgress/schema/game-progress.schema'
import { MockModel } from '../../../../database/test/support/mock.model'
import { gameProgressStub } from '../stubs/usersGameProgress.stub'

export class GameProgressModel extends MockModel<GameProgress> {
  protected entityStub = gameProgressStub()
}
