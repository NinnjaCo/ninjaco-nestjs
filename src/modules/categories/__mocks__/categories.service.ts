import { categoryStub } from '../test/stubs/category.stub'

export const RolesService = jest.fn().mockReturnValue({
  findAll: jest.fn().mockResolvedValue([categoryStub()]),
})
