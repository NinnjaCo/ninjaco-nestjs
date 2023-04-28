import { gameStub } from '../test/stubs/game.stub'

export const GamesService = jest.fn().mockReturnValue({
  findAll: jest.fn().mockResolvedValue([gameStub()]),
  createGame: jest.fn().mockResolvedValue(gameStub()),
})
