import { FilterQuery } from 'mongoose'
import { Role } from '../schemas/role.schema'
import { RoleModel } from './support/role.model'
import { RolesRepository } from '../roles.repository'
import { Test, TestingModule } from '@nestjs/testing'
import { getModelToken } from '@nestjs/mongoose'
import { roleStub } from './stubs/role.stub'
import { CategoryRepository } from '../categories.repository'
import { CategoryModel } from '../support/categorymodel'
import { Category } from './category.schema'
import { categoryStub } from '../stubs/category.stub'

describe('CategoriesRepository', () => {
  let repository: CategoryRepository

  describe('Find Operations', () => {
    let categoryModel: CategoryModel
    let categoryFilterQuery: FilterQuery<Category>

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          CategoryRepository,
          {
            //
            provide: getModelToken(Role.name),
            useClass: CategoryModel,
          },
        ],
      }).compile()

      repository = module.get<CategoryRepository>(RolesRepository)
      categoryModel = module.get<CategoryModel>(getModelToken(categoryFilterQuery._id))
      categoryFilterQuery = { _id: categoryStub()._id }

      jest.clearAllMocks()
    })

    describe('findAll', () => {
      describe('when findAll is called', () => {
        let role: Role[]

        beforeEach(async () => {
          jest.spyOn(categoryModel, 'find')
          role = (await repository.find({})) as Category[]
        })

        test('then it should call the category Model', () => {
          expect(categoryModel.find).toHaveBeenCalledWith({})
        })

        test('then it should return a category array', () => {
          expect(category).toEqual([categoryStub()])
        })
      })
    })
  })
})
