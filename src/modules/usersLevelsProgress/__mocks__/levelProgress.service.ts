import { levelProgressStub } from '../test/stubs/levelProgress.stub'

export const LevelProgressService = jest.fn().mockReturnValue({
  findAll: jest.fn().mockResolvedValue([levelProgressStub()]),
  create: jest.fn().mockResolvedValue(levelProgressStub()),
})
