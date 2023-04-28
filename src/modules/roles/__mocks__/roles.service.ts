import { roleStub } from '../test/stubs/role.stub'

export const RolesService = jest.fn().mockReturnValue({
  findAll: jest.fn().mockResolvedValue([roleStub()]),
})
