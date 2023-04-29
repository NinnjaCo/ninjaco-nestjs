import { FilterQuery } from 'mongoose'
import { Role } from '../schemas/role.schema'
import { RoleModel } from './support/role.model'
import { RolesRepository } from '../roles.repository'
import { Test, TestingModule } from '@nestjs/testing'
import { getModelToken } from '@nestjs/mongoose'
import { roleStub } from './stubs/role.stub'
import { CategoryRepository } from '../categories.repository'
import { CategoryModel } from '../support/categorymodel'
import { Category } from './category.schema'

describe('CategoriesRepository', () => {
  let repository: CategoryRepository

  describe('Find Operations', () => {
    let categoryModel: CategoryModel
    let categoryFilterQuery: FilterQuery<Category>

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          RolesRepository,
          {
            provide: getModelToken(Role.name),
            useClass: RoleModel,
          },
        ],
      }).compile()

      repository = module.get<RolesRepository>(RolesRepository)
      roleModel = module.get<RoleModel>(getModelToken(Role.name))
      roleFilterQuery = { _id: roleStub()._id }

      jest.clearAllMocks()
    })

    describe('findAll', () => {
      describe('when findAll is called', () => {
        let role: Role[]

        beforeEach(async () => {
          jest.spyOn(roleModel, 'find')
          role = (await repository.find({})) as Role[]
        })

        test('then it should call the roleModel', () => {
          expect(roleModel.find).toHaveBeenCalledWith({})
        })

        test('then it should return a role array', () => {
          expect(role).toEqual([roleStub()])
        })
      })
    })
  })
})
