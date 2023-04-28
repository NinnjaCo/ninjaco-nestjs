import { Test, TestingModule } from '@nestjs/testing'
import { User } from '../schemas/user.schema'
import { UsersController } from '../users.controller'
import { UsersService } from '../users.service'
import { userStub } from './stubs/user.stub'

jest.mock('../users.service')

describe('UsersController', () => {
  let controller: UsersController
  let usersService: UsersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile()

    controller = module.get<UsersController>(UsersController)
    usersService = module.get<UsersService>(UsersService)
    jest.clearAllMocks()
  })

  test('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('findAllUsers', () => {
    describe('when findAllUsers is called', () => {
      let users: User[]

      beforeEach(async () => {
        users = await controller.findAll()
      })

      test('should call usersService.findAllUsers', () => {
        expect(usersService.findAll).toBeCalled()
      })

      test('should return an array of users', () => {
        expect(users).toEqual([userStub()])
      })
    })
  })
})
