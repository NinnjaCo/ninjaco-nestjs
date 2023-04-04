import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateUsersDto } from './dto/create-user.dto'
import { User } from './schemas/user.schema'
import { UsersRepository } from './users.repository'
import { checkIfValidObjectId, hashData } from 'common/shared'

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
   * @param user
   * @returns Promise<User>
   * @description user.password is hashed before saving
   * @description user.email is unique since the email is set as unique in the schema
   */
  create(user: CreateUsersDto): Promise<User> {
    // hash password
    user.password = hashData(user.password)

    return this.usersRepository.create(user)
  }
}
