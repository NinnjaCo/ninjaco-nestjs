import { CreateGameDto } from '../dto/create-game.dto'
import { Game } from '../schemas/game.schema'
import { GamesController } from '../games.controller'
import { GamesService } from '../games.service'
import { Test, TestingModule } from '@nestjs/testing'
import { gameStub } from './stubs/game.stub'

jest.mock('../games.service')

describe('GamesController', () => {
  let controller: GamesController
  let gamesService: GamesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GamesController],
      providers: [GamesService],
    }).compile()

    controller = module.get<GamesController>(GamesController)
    gamesService = module.get<GamesService>(GamesService)
    jest.clearAllMocks()
  })

  test('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('findAllGames', () => {
    describe('when findAllGames is called', () => {
      let games: Game[]

      beforeEach(async () => {
        games = await controller.findAll()
      })

      test('should call GamesService.findAllGames', () => {
        expect(gamesService.findAll).toBeCalled()
      })

      test('should return an array of games', () => {
        expect(games).toEqual([gameStub()])
      })
    })
  })

  describe('createGame', () => {
    describe('when createGame is called', () => {
      let game: Game
      let CreateGameDto: CreateGameDto

      beforeEach(async () => {
        const {
          title,
          image,
          playerDirection,
          numOfBlocks,
          sizeOfGrid,
          playerLocation,
          goalLocation,
          wallsLocations,
        } = gameStub()

        CreateGameDto = {
          title,
          image,
          playerDirection,
          numOfBlocks,
          sizeOfGrid,
          playerLocation,
          goalLocation,
          wallsLocations,
        }

        game = await controller.create(CreateGameDto)
      })

      test('should call gamesService.createGame', () => {
        expect(gamesService.create).toBeCalledWith(CreateGameDto)
      })

      test('should return a game', () => {
        expect(game).toEqual(gameStub())
      })
    })
  })
})
