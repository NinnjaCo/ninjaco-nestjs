import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { CreateUsersDto } from './dto/create-user.dto'
import { MongoServerError } from 'mongodb'
import { RoleEnum } from 'modules/roles/roles.enum'
import { RolesService } from 'modules/roles/roles.service'
import { User } from './schemas/user.schema'
import { UsersRepository } from './users.repository'
import { checkIfValidObjectId, handleMongoDuplicateKeyError, hashData } from 'common/shared'

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly roleService: RolesService
  ) {}

  /**
   * Delete user by id
   * @param userId
   * @returns Promise<User> if user is found, otherwise null
   */
  async remove(userId: string): Promise<User> {
    return await this.usersRepository.findOneAndDelete({ _id: userId })
  }

  /**
   * Find user by id
   * @param userId
   * @returns Promise<User> if user is found, otherwise null
   */
  async findOne(userId: string): Promise<User> {
    // check if userId is of type ObjectId
    if (!checkIfValidObjectId(userId)) {
      throw new BadRequestException('Invalid user id')
    }
    return await this.usersRepository.findOne({ _id: userId })
  }

  /**
   * Find all users
   * @returns Promise<User[]> if users are found, otherwise empty array
   */
  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({})
  }

  /**
   * Create new user
   * @param CreateUsersDto
   * @returns Promise<User>
   * @description user.password is hashed before saving
   * @description user.email is unique since the email is set as unique in the schema
   */
  async create(userDto: CreateUsersDto): Promise<User> {
    // hash password
    userDto.password = hashData(userDto.password)

    // If no role is provided, set the default role to user
    if (!userDto.role) {
      userDto.role = await this.roleService.getRole(RoleEnum.USER)
    }

    try {
      const createdUser = await this.usersRepository.create(userDto)
      return createdUser
    } catch (error) {
      // if error type is from mongodb
      if (error instanceof MongoServerError) {
        // This will automatically throw a BadRequestException with the duplicate key error message
        handleMongoDuplicateKeyError(error)
      } else {
        throw new InternalServerErrorException(error)
      }
    }
  }

  /**
   * Find user by email
   * @param email
   * @returns Promise<User> if user is found, otherwise null
   */
  async findOneByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({ email })
  }

  /**
   * Update user by id
   * @param userId
   * @param updateDto
   * @returns Promise<User> if user is found, otherwise null
   * @description user.password is hashed before saving
   * @description user.email is unique since the email is set as unique in the schema
   */
  async update(userId: string, updateDto): Promise<User> {
    if (updateDto.password) {
      updateDto.password = hashData(updateDto.password)
    }

    try {
      return await this.usersRepository.findOneAndUpdate({ _id: userId }, updateDto)
    } catch (error) {
      // if error type is from mongodb
      if (error instanceof MongoServerError) {
        // This will automatically throw a BadRequestException with the duplicate key error message
        handleMongoDuplicateKeyError(error)
      } else {
        throw new InternalServerErrorException(error)
      }
    }
  }
}
