import { MockModel } from '../../../../database/test/support/mock.model'
import { Role } from '../../schemas/role.schema'
import { roleStub } from '../stubs/role.stub'

export class RoleModel extends MockModel<Role> {
  protected entityStub = roleStub()
}
