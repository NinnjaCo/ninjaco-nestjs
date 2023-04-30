import { Category } from '../../schemas/category.schema'
import mongoose from 'mongoose'

export const categoryStub: () => Category = () => {
  return {
    _id: new mongoose.Types.ObjectId('5f9d5c2e5a6c2a1f9c2aae4f'),
    categoryName: 'easy',
    createdAt: 'Thu Apr 20 2023 15:24:53 GMT+0000 (Coordinated Universal Time)',
    updatedAt: 'Thu Apr 20 2023 15:24:53 GMT+0000 (Coordinated Universal Time)',
    __v: 0,
  }
}
