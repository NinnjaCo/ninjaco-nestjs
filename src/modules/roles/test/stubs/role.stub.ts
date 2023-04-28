import { Role } from '../../schemas/role.schema'
import { RoleEnum } from '../../roles.enum'
import mongoose from 'mongoose'

export const roleStub: () => Role = () => {
  return {
    _id: new mongoose.Types.ObjectId('5f9d5c2e5a6c2a1f9c2aae4f'),
    createdAt: '2023-04-08T15:35:45.804Z',
    updatedAt: '2023-04-08T15:35:45.805Z',
    role: RoleEnum.USER,
  }
}
