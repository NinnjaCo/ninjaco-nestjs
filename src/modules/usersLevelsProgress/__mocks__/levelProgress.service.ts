export const LevelProgressService = jest.fn().mockReturnValue({
  findAll: jest.fn().mockResolvedValue([levelProgressStub()]),
  create: jest.fn().mockResolvedValue(levelProgressStub()),
})
