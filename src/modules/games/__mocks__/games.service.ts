import { gameStub } from '../test/stubs/game.stub'

export const GamesService = jest.fn().mockReturnValue({
  findAll: jest.fn().mockResolvedValue([gameStub()]),
  create: jest.fn().mockResolvedValue(gameStub()),
})
