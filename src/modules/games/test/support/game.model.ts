import { Game } from '../../../games/schemas/game.schema'
import { MockModel } from '../../../../database/test/support/mock.model'
import { gameStub } from '../stubs/game.stub'

export class GamesModel extends MockModel<Game> {
  protected entityStub = gameStub()
}
