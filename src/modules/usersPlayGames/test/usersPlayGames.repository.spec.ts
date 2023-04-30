import { Test, TestingModule } from '@nestjs/testing'
import { UserPlayGame } from '../schemas/userPlayGame.schema'
import { UserPlayGameModel } from './support/userPlayGame.model'
import { UsersPlayGamesRepository } from '../usersPlayGames.repository'
import { getModelToken } from '@nestjs/mongoose'
import { userPlayGameStub } from './stubs/userPlayGame.stub'

describe('UsersPlayGamesRepository', () => {
  describe('Find Operations', () => {
    let userPlayGameModel: UserPlayGameModel

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          UsersPlayGamesRepository,
          {
            provide: getModelToken(UserPlayGame.name),
            useClass: UserPlayGameModel,
          },
        ],
      }).compile()

      userPlayGameModel = module.get<UserPlayGameModel>(getModelToken(UserPlayGame.name))

      jest.clearAllMocks()
    })

    describe('findAll', () => {
      describe('when findAll is called', () => {
        let userPlayGames: UserPlayGame[]

        beforeEach(async () => {
          jest.spyOn(userPlayGameModel, 'find')
          userPlayGames = (await userPlayGameModel.find({})) as UserPlayGame[]
        })

        test('then it should call the userPlayGameModel', () => {
          expect(userPlayGameModel.find).toHaveBeenCalledWith({})
        })

        test('then it should return a user', () => {
          expect(userPlayGames).toEqual([userPlayGameStub()])
        })
      })
    })

    describe('Create Operations', () => {
      beforeEach(async () => {
        await Test.createTestingModule({
          providers: [
            UsersPlayGamesRepository,
            {
              provide: getModelToken(UserPlayGame.name),
              useClass: UserPlayGameModel,
            },
          ],
        }).compile()
      })

      describe('create', () => {
        describe('when create is called', () => {
          let userPlayGame: UserPlayGame
          let entity: UserPlayGameModel

          beforeEach(async () => {
            jest.spyOn(UserPlayGameModel.prototype, 'save')
            entity = new UserPlayGameModel(userPlayGameStub())
            userPlayGame = await entity.save()
          })

          test('then it should call the userPlayGameModel', () => {
            expect(entity.save).toHaveBeenCalledWith()
          })

          test('then it should return a user', () => {
            expect(userPlayGame).toEqual(userPlayGameStub())
          })
        })
      })
    })
  })
})
