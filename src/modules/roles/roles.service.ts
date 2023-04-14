import { Injectable } from '@nestjs/common'
import { Role } from './schemas/role.schema'
import { RoleEnum } from './roles.enum'
import { RolesRepository } from './roles.repository'

@Injectable()
export class RolesService {
  constructor(private readonly rolesRepository: RolesRepository) {}

  /**
   * Returns all the roles in the database
   * @returns {Promise<Role[]>}
   */
  async getRoles() {
    return await this.rolesRepository.find({})
  }

  /**
   * Returns a role by its name
   * @param {RoleEnum} role
   * @returns {Promise<Role>}
   * @memberof RolesService
   */
  async getRole(role: RoleEnum) {
    return await this.rolesRepository.findOne({ role })
  }

  /**
   * Returns a role by its id
   * @param {string} id
   * @returns {Promise<Role>}
   */
  async getRoleById(id: string): Promise<Role> {
    return await this.rolesRepository.findOne({ _id: id })
  }

  /**
   * Checks if a role exists in the database
   * @param {string} role
   * @returns {Promise<boolean>}
   * @memberof RolesService
   */
  async isRoleExist(role: string): Promise<boolean> {
    return await this.rolesRepository.exists({ role })
  }

  /**
   * Creates a new role
   * @param {RoleEnum} role
   * @returns {Promise<Role>}
   * @memberof RolesService
   */
  async createRole(role: RoleEnum): Promise<Role> {
    return await this.rolesRepository.create({ role })
  }
}
