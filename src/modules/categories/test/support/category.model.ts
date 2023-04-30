import { Category } from '../../schemas/category.schema'
import { MockModel } from '../../../../database/test/support/mock.model'
import { categoryStub } from '../stubs/category.stub'

export class CategoryModel extends MockModel<Category> {
  protected entityStub = categoryStub()
}
