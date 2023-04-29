import { userPlayGameStub } from '../test/stubs/userPlayGame.stub'

export const UsersPlayGamesService = jest.fn().mockReturnValue({
  findAll: jest.fn().mockResolvedValue([userPlayGameStub()]),
  createFeedback: jest.fn().mockResolvedValue(userPlayGameStub()),
})
