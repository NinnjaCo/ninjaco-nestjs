import { categoryStub } from '../test/stubs/category.stub'

export const CategoriesService = jest.fn().mockReturnValue({
  findAll: jest.fn().mockResolvedValue([categoryStub()]),
  createCategory: jest.fn().mockResolvedValue(categoryStub()),
})
