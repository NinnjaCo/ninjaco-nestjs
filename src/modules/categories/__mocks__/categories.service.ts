import { categoryStub } from '../stubs/category.stub'

export const RolesService = jest.fn().mockReturnValue({
  findAll: jest.fn().mockResolvedValue([categoryStub()]),
})
