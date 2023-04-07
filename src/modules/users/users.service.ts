import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { CreateUsersDto } from './dto/create-user.dto'
import { MongoServerError } from 'mongodb'
import { User } from './schemas/user.schema'
import { UsersRepository } from './users.repository'
import { checkIfValidObjectId, handleMongoDuplicateKeyError, hashData } from 'common/shared'

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  /**
   * Delete user by id
   * @param userId
   * @returns Promise<User> if user is found, otherwise null
   */
  remove(userId: string): Promise<User> {
    return this.usersRepository.findOneAndDelete({ _id: userId })
  }

  /**
   * Find user by id
   * @param userId
   * @returns Promise<User> if user is found, otherwise null
   */
  findOne(userId: string): Promise<User> {
    // check if userId is of type ObjectId
    if (!checkIfValidObjectId(userId)) {
      throw new BadRequestException('Invalid user id')
    }
    return this.usersRepository.findOne({ _id: userId })
  }

  /**
   * Find all users
   * @returns Promise<User[]> if users are found, otherwise empty array
   */
  findAll(): Promise<User[]> {
    return this.usersRepository.find({})
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
  findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ email })
  }

  /**
   * Update user by id
   * @param userId
   * @param updateDto
   * @returns Promise<User> if user is found, otherwise null
   * @description user.password is hashed before saving
   * @description user.email is unique since the email is set as unique in the schema
   */
  update(userId: string, updateDto): Promise<User> {
    if (updateDto.password) {
      updateDto.password = hashData(updateDto.password)
    }
    return this.usersRepository.findOneAndUpdate({ _id: userId }, updateDto)
  }
}
