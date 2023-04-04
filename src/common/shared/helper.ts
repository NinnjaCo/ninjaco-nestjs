import * as crypto from 'crypto'
import mongoose from 'mongoose'
/**
 * Hash data with sha256
 * @param data
 * @returns {string}
 */
export const hashData = (data: any) => {
  const hash = crypto.createHash('sha256')
  hash.update(data)
  return hash.digest('hex')
}

/**
 * Check if string is a valid ObjectId MongoDB
 * @param id
 * @returns {boolean}
 * @description create a new ObjectId from the given id, the id can only by valid if the new ObjectId is equal to the given id, otherwise it is not valid
 */
export const checkIfValidObjectId = (id: string) => {
  const ObjectId = mongoose.Types.ObjectId
  return ObjectId.isValid(id) && new ObjectId(id).toString() === id
}
