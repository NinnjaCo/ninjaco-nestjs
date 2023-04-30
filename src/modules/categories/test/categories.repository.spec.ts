import { Category } from '../schemas/category.schema'
import { CategoryModel } from './support/category.model'
import { CategoryRepository } from '../categories.repository'
import { Test, TestingModule } from '@nestjs/testing'
import { categoryStub } from './stubs/category.stub'
import { getModelToken } from '@nestjs/mongoose'

describe('CategoriesRepository', () => {
  let repository: CategoryRepository

  describe('Find Operations', () => {
    let categoryModel: CategoryModel

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          CategoryRepository,
          {
            provide: getModelToken(Category.name),
            useClass: CategoryModel,
          },
        ],
      }).compile()

      repository = module.get<CategoryRepository>(CategoryRepository)
      categoryModel = module.get<CategoryModel>(getModelToken(Category.name))

      jest.clearAllMocks()
    })

    describe('findAll', () => {
      describe('when findAll is called', () => {
        let category: Category[]

        beforeEach(async () => {
          jest.spyOn(categoryModel, 'find')
          category = (await repository.find({})) as Category[]
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
