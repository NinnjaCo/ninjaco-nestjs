import { gameProgressStub } from '../test/stubs/usersGameProgress.stub'

export const gameProgressService = jest.fn().mockReturnValue({
  getGameProgress: jest.fn().mockResolvedValue([gameProgressStub()]),
  create: jest.fn().mockResolvedValue(gameProgressStub()),
})
