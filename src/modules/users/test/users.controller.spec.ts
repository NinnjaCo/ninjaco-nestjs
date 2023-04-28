import { CreateUsersDto } from '../dto/create-user.dto'
import { Test, TestingModule } from '@nestjs/testing'
import { UpdateUserDto } from '../dto/update-user.dto'
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

  describe('findUserById', () => {
    describe('when findUserById is called', () => {
      let user: User
      let userId: string

      beforeEach(async () => {
        user = await controller.findOne(userId)
      })

      test('should call usersService.findUserById', () => {
        expect(usersService.findOne).toBeCalled()
      })

      test('should return a user', () => {
        expect(user).toEqual(userStub())
      })
    })
  })

  describe('createUser', () => {
    describe('when createUser is called', () => {
      let user: User
      let createUserDto: CreateUsersDto

      beforeEach(async () => {
        const { firstName, lastName, dateOfBirth, email, password } = userStub()
        createUserDto = { firstName, lastName, dateOfBirth, email, password }
        user = await controller.create(createUserDto)
      })

      test('should call usersService.createUser', () => {
        expect(usersService.create).toBeCalledWith(createUserDto)
      })

      test('should return a user', () => {
        expect(user).toEqual(userStub())
      })
    })
  })
  describe('removeUser', () => {
    describe('when removeUser is called', () => {
      let user: User
      let userId: string

      beforeEach(async () => {
        user = await controller.remove(userId)
      })

      test('should call usersService.removeUser', () => {
        expect(usersService.remove).toBeCalledWith(userId)
      })

      test('should return a user', () => {
        expect(user).toEqual(userStub())
      })
    })
  })

  describe('updateUser', () => {
    describe('when updateUser is called', () => {
      let user: User
      let updateUserDto: UpdateUserDto
      let userId: string

      beforeEach(async () => {
        const { firstName, lastName, dateOfBirth, email, password } = userStub()
        updateUserDto = {
          firstName,
          lastName,
          dateOfBirth,
          email,
          password,
          points: 0,
          profilePicture: '',
        }
        user = await controller.update(userId, updateUserDto)
      })

      test('should call usersService.updateUser', () => {
        expect(usersService.update).toBeCalledWith(userId, updateUserDto)
      })

      test('should return a user', () => {
        expect(user).toEqual(userStub())
      })
    })
  })
})
