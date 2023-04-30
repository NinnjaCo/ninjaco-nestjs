import { MockModel } from '../../../../database/test/support/mock.model'
import { UserPlayGame } from 'modules/usersPlayGames/schemas/userPlayGame.schema'
import { userPlayGameStub } from '../stubs/userPlayGame.stub'

export class UserPlayGameModel extends MockModel<UserPlayGame> {
  protected entityStub = userPlayGameStub()
}
