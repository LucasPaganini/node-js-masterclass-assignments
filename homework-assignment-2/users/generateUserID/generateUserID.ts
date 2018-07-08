import { listUsersIDs } from '../listUsersIDs'

const generateID = (length: number): string =>
  ('' + Math.floor(Math.random() * 10 ** length)).padStart(length, '0')

export const generateUserID = async () => {
  // Generate an ID
  const ID_LEN = 10
  let id = generateID(ID_LEN)

  // Check if this ID is already being used
  // Repeat the process until the generated ID is unique
  const usedIDs = new Set(await listUsersIDs())
  while (usedIDs.has(id)) id = generateID(ID_LEN)

  return id
}
