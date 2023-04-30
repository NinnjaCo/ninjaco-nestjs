import { gameProgressStub } from '../test/stubs/usersGameProgress.stub'

export const GameProgressService = jest.fn().mockReturnValue({
  updateGameProgress: jest.fn().mockResolvedValue(gameProgressStub()),
})
