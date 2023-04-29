import { Category } from '../schemas/category.schema'
import mongoose from 'mongoose'

export const categoryStub: () => Category = () => {
  return {
    _id: new mongoose.Types.ObjectId('5f9d5c2e5a6c2a1f9c2aae4f'),
    categoryName: 'category',
  }
}
