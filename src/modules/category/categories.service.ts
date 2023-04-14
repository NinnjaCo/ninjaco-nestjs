import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { Category } from './schemas/category.schema'
import { CategoryRepository } from './categories.repository'
import { CreateCategoryDto } from './dto/create-category.dto'
import { MongoServerError } from 'mongodb'
import { checkIfValidObjectId, handleMongoDuplicateKeyError } from 'common/shared'

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  /**
   * Find all categories
   * @returns Promise <Category[]> if categories are found, otherwise empty array
   */

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find({})
  }
  /**
   * Create new category
   * @param CreateCategoryDto
   * @returns Promise<category>
   */

  async createCategory(categoryDto: CreateCategoryDto): Promise<Category> {
    try {
      const category = await this.categoryRepository.create(categoryDto)
      return category
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
   * Find category by id
   * @param categoryId
   * @returns Promise<Category> if category is found, otherwise null
   */

  async findCategoryById(categoryId: string): Promise<Category> {
    // check if categoryId is of type ObjectId
    if (!checkIfValidObjectId(categoryId)) {
      throw new BadRequestException('Invalid category id')
    }
    return await this.categoryRepository.findOne({ _id: categoryId })
  }
  /**
   * Update category by id
   * @param categoryId
   * @param updateCategoryDto
   * @returns Promise<Category> if category is found, otherwise null
   */

  async updateCategory(categoryId: string, CreateCategoryDto): Promise<Category> {
    try {
      return await this.categoryRepository.findOneAndUpdate({ _id: categoryId }, CreateCategoryDto)
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
   * Delete category by id
   * @param categoryeId
   * @returns Promise<category> if category is found, otherwise null
   */

  async deleteCategory(categoryId: string): Promise<Category> {
    return await this.categoryRepository.findOneAndDelete({ _id: categoryId })
  }
}
