import { RoleEnum } from '../../../../modules/roles/roles.enum'
import { User } from '../../../users/schemas/user.schema'
import mongoose from 'mongoose'

export const userStub: () => User = () => ({
  _id: new mongoose.Types.ObjectId('5f9d5c2e5a6c2a1f9c2aae4f'),
  createdAt: '2023-04-12T20:20:07.607Z',
  updatedAt: 'Sun Apr 23 2023 17:15:55 GMT+0000 (Coordinated Universal Time)',
  firstName: 'user',
  lastName: 'user',
  dateOfBirth: '2002-02-11T21:31:22.000Z',
  email: 'user1@gmail.com',
  password: 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f',
  role: {
    _id: new mongoose.Types.ObjectId('5f9d5c2e5a6c2a1f9c2aae4f'),
    createdAt: '2023-04-08T15:35:45.804Z',
    updatedAt: '2023-04-08T15:35:45.805Z',
    role: RoleEnum.ADMIN,
  },
  isVerified: true,
  points: 0,
  hashedRt: 'b9b015b7cdef511dfbe8622e02675d4192ddc683c35aac613ae1d85ffca98eae',
  resetPasswordToken: 'b9b015b7cdef511dfbe8622e02675d4192ddc683c35aac613ae1d85ffca98eae',
  verifyEmailToken: 'b9b015b7cdef511dfbe8622e02675d4192ddc683c35aac613ae1d85ffca98eae',
  profilePicture:
    'https://res.cloudinary.com/dkcbxnhg0/image/upload/v1604116555/avatars/5f9d5c2e5a6c2a1f9c2aae4f.jpg',
})
