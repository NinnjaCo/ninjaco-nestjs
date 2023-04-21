import { ApiGlobalResponse } from '../../common/decorators/api-global-response.decorators'
import { ApiTags } from '@nestjs/swagger'
import { ArraySchema } from '../../swagger/swagger-primitive-type'
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { Category } from './schemas/category.schema'
import { CreateCategoryDto } from './dto/create-category.dto'
import { RoleEnum } from '../roles/roles.enum'
import { Roles } from '../roles/roles.decorator'
import { UpdateCategoryDto } from './dto/update-category.dto'

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  @ApiGlobalResponse(ArraySchema, {
    description: 'Get all categories ',
    isArray: true,
  })
  @Get()
  findAll(): Promise<Category[]> {
    return this.categoriesService.findAll()
  }

  @ApiGlobalResponse(Category, {
    description: 'Get category by id',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.findCategoryById(id)
  }

  @ApiGlobalResponse(Category, {
    description: 'Delete category by id | ADMIN and creator only',
  })
  @Roles(RoleEnum.ADMIN, RoleEnum.CREATOR)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.deleteCategory(id)
  }

  @ApiGlobalResponse(Category, {
    description: 'Update category information | ADMIN and creator only',
  })
  @Roles(RoleEnum.ADMIN, RoleEnum.CREATOR)
  @Put(':id')
  update(@Param('id') id: string, @Body() categoryDto: UpdateCategoryDto): Promise<Category> {
    return this.categoriesService.updateCategory(id, categoryDto)
  }

  @ApiGlobalResponse(Category, {
    description: 'Create new category | ADMIN and creator only',
  })
  @Roles(RoleEnum.ADMIN, RoleEnum.CREATOR)
  @Post()
  create(@Body() categoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoriesService.createCategory(categoryDto)
  }
}
