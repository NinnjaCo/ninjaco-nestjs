import { CategoriesController } from './categories.controller'
import { CategoriesService } from './categories.service'
import { Category, CategorySchema } from './schemas/category.schema'
import { CategoryRepository } from './categories.repository'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }])],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoryRepository],
  exports: [CategoriesService],
})
export class CategoriesModule {}
