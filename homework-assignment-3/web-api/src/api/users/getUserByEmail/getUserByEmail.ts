import { listUsersIDs } from '../listUsersIDs'
import { User } from '../User'
import { getUser } from '../getUser'

export const getUserByEmail = async (userEmail: string): Promise<User> => {
  const ids = await listUsersIDs()
  const users = await Promise.all(ids.map(getUser))
  const user = users.find(({ email }) => email === userEmail)
  if (!user) throw new Error(`No user found with the email "${userEmail}"`)
  return user
}
