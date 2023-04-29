import { userPlayGameStub } from '../test/stubs/userPlayGame.stub'

export const UsersPlayGamesService = jest.fn().mockReturnValue({
  getCompletedGames: jest.fn().mockResolvedValue([userPlayGameStub()]),
  createUserPlayGameEntry: jest.fn().mockResolvedValue(userPlayGameStub()),
})
