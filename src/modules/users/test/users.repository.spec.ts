import { FilterQuery } from 'mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { User } from '../schemas/user.schema'
import { UserModel } from './support/user.model'
import { UsersRepository } from '../users.repository'
import { getModelToken } from '@nestjs/mongoose'
import { userStub } from './stubs/user.stub'

describe('UsersRepository', () => {
  let repository: UsersRepository

  describe('Find Operations', () => {
    let userModel: UserModel
    let userFilterQuery: FilterQuery<User>

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          UsersRepository,
          {
            provide: getModelToken(User.name),
            useClass: UserModel,
          },
        ],
      }).compile()

      repository = module.get<UsersRepository>(UsersRepository)
      userModel = module.get<UserModel>(getModelToken(User.name))
      userFilterQuery = { _id: userStub()._id }

      jest.clearAllMocks()
    })

    describe('find', () => {
      describe('when findAll is called', () => {
        let users: User[]

        beforeEach(async () => {
          jest.spyOn(userModel, 'find')
          users = (await repository.find({})) as User[]
        })

        test('then it should call the userModel', () => {
          expect(userModel.find).toHaveBeenCalledWith({})
        })

        test('then it should return a user', () => {
          expect(users).toEqual([userStub()])
        })
      })
    })

    describe('findOne', () => {
      describe('when findOne is called', () => {
        let user: User

        beforeEach(async () => {
          jest.spyOn(userModel, 'findOne')
          user = (await repository.findOne(userFilterQuery)) as User
        })

        test('then it should call the userModel', () => {
          expect(userModel.findOne).toHaveBeenCalledWith(userFilterQuery)
        })

        test('then it should return a user', () => {
          expect(user).toEqual(userStub())
        })
      })
    })
  })
})
