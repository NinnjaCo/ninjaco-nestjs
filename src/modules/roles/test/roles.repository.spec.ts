import { FilterQuery } from 'mongoose'
import { Role } from '../schemas/role.schema'
import { RoleModel } from './support/role.model'
import { RolesRepository } from '../roles.repository'
import { Test, TestingModule } from '@nestjs/testing'
import { getModelToken } from '@nestjs/mongoose'
import { roleStub } from './stubs/role.stub'

describe('RolesRepository', () => {
  let repository: RolesRepository

  describe('Find Operations', () => {
    let roleModel: RoleModel
    let roleFilterQuery: FilterQuery<Role>

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
