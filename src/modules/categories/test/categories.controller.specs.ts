import { CategoriesController } from '../categories.controller'
import { CategoriesService } from '../categories.service'
import { Category } from '../schemas/category.schema'
import { CreateCategoryDto } from '../dto/create-category.dto'
import { Test, TestingModule } from '@nestjs/testing'
import { categoryStub } from './stubs/category.stub'

jest.mock('../categories.service')

describe('CategoriesController', () => {
  let controller: CategoriesController
  let categoriesService: CategoriesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [CategoriesService],
    }).compile()

    controller = module.get<CategoriesController>(CategoriesController)
    categoriesService = module.get<CategoriesService>(CategoriesService)
    jest.clearAllMocks()
  })

  test('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('findAllCategories', () => {
    describe('when findAllCategories is called', () => {
      let categories: Category[]

      beforeEach(async () => {
        categories = await controller.findAll()
      })

      test('should call CategoriesService.findAllCategories', () => {
        expect(categoriesService.findAll).toBeCalled()
      })

      test('should return an array of categories', () => {
        expect(categories).toEqual([categoryStub()])
      })
    })
  })

  describe('createCategory', () => {
    describe('when createCategory is called', () => {
      let category: Category
      let createCategoryDto: CreateCategoryDto

      beforeEach(async () => {
        const { categoryName } = categoryStub()

        createCategoryDto = {
          categoryName,
        }

        category = await controller.create(createCategoryDto)
      })

      test('should call categoryService.createCategory', () => {
        expect(categoriesService.createCategory).toBeCalledWith(createCategoryDto)
      })

      test('should return a category', () => {
        expect(category).toEqual(categoryStub())
      })
    })
  })
})
