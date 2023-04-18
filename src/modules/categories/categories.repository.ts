import { Category, CategoryDocument } from './schemas/category.schema'
import { EntityRepository } from '../../database/entity.repository'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'

@Injectable()
export class CategoryRepository extends EntityRepository<CategoryDocument> {
  constructor(@InjectModel(Category.name) private readonly categoryModel: Model<CategoryDocument>) {
    super(categoryModel)
  }
}
