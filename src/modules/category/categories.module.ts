import { CategoriesController } from './categories.controller'
import { CategoriesService } from './categories.service'
import { Category, CategorySchema } from './schemas/category.schema'
import { CategoryRepository } from './categories.repository'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { RolesModule } from 'modules/roles/roles.module'
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]),
    RolesModule,
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoryRepository],
  exports: [CategoriesService],
})
export class CategoriesModule {}
