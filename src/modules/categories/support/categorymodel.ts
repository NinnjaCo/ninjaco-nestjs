import { Category } from '../schemas/category.schema'
import { MockModel } from '../../../../database/test/support/mock.model'
import { Role } from '../../schemas/role.schema'
import { roleStub } from '../stubs/role.stub'

export class CategoryModel extends MockModel<Category> {
  protected entityStub = roleStub()
}
