import { CategoriesController } from '../categories.controller'
import { CategoriesService } from '../categories.service'
import { Category } from '../schemas/category.schema'
import { CreateGameDto } from '../dto/create-game.dto'
import { Game } from '../schemas/game.schema'
import { GamesController } from '../games.controller'
import { GamesService } from '../games.service'
import { Test, TestingModule } from '@nestjs/testing'
import { gameStub } from './stubs/game.stub'
import { categoryStub } from './stubs/category.stub'
import { CreateCategoryDto } from '../dto/create-category.dto'

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

      test('should call GamesService.findAllGames', () => {
        expect(categoriesService.findAll).toBeCalled()
      })

      test('should return an array of games', () => {
        expect(categories).toEqual([categoryStub()])
      })
    })
  })

  describe('createGame', () => {
    describe('when createGame is called', () => {
      let category: Category
      let createCategoryDto: CreateCategoryDto

      beforeEach(async () => {
        const { categoryName } = gameStub()

        createCategoryDto = {
          categoryName,
        }

        category = await controller.create(createCategoryDto)
      })

      test('should call gamesService.createGame', () => {
        expect(categoriesService.createCategory).toBeCalledWith(createCategoryDto)
      })

      test('should return a game', () => {
        expect(category).toEqual(gameStub())
      })
    })
  })
})
