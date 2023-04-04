import * as crypto from 'crypto'

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
