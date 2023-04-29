import { categoryStub } from '../test/support/support/stubs/category.stub'

export const RolesService = jest.fn().mockReturnValue({
  findAll: jest.fn().mockResolvedValue([categoryStub()]),
})
