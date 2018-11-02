import * as crypto from 'crypto'
import { salt } from '../../../config'

/**
 * Hashes a plain text to a 128 char length string using sha512.
 *
 * @param {string} plainText Text to hash
 * @returns {Promise<string>} Hashed text
 */
export const hashPassword = (plainText: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(plainText, salt, 1000, 64, 'sha512', (err, result) => {
      if (err) reject(err)
      else resolve(result.toString('hex'))
    })
  })
}
