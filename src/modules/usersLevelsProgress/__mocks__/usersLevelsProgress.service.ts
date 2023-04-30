import { levelProgressStub } from '../test/stubs/levelProgress.stub'

export const UsersLevelsProgressService = jest.fn().mockReturnValue({
  findAll: jest.fn().mockResolvedValue([levelProgressStub()]),
  createLevelProgress: jest.fn().mockResolvedValue(levelProgressStub()),
})
