import { GameProgress } from '../schema/game-progress.schema'
import { userPlayGameStub } from '../test/stubs/userPlayGame.stub'
import { gameProgressStub } from '../test/stubs/usersGameProgress.stub'

export const gameProgressService = jest.fn().mockReturnValue({
  getGameProgress: jest.fn().mockResolvedValue([gameProgressStub()]),
  create: jest.fn().mockResolvedValue(gameProgressStub()),
})
