import { Injectable } from '@nestjs/common'
import { RoleEnum } from './roles.enum'
import { RolesRepository } from './roles.repository'

@Injectable()
export class RolesService {
  constructor(private readonly rolesRepository: RolesRepository) {}

  async getRoles() {
    return await this.rolesRepository.find({})
  }

  async getRole(role: RoleEnum) {
    return await this.rolesRepository.findOne({ role })
  }

  async getRoleById(id: string) {
    return await this.rolesRepository.findOne({ _id: id })
  }

  async isRoleExist(role: string) {
    return await this.rolesRepository.exists({ role })
  }

  async createRole(role: RoleEnum) {
    return await this.rolesRepository.create({ role })
  }
}
