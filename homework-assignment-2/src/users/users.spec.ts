import * as fs from 'fs'
import { listUsersIDs } from './listUsersIDs'
import { createUser } from './createUser'
import { deleteUser } from './deleteUser'
import { USERS_DB_PATH } from './USERS_DB_PATH'
import { UserData } from './UserData'
import { updateUser } from './updateUser'
import { getUser } from './getUser'

/**
 * Tells if the async function passed as parameter throws or not.
 *
 * @param {Function} fn Async function to listen to throw
 * @returns {boolean} If the function did throw
 */
const didAsyncThrow = async (
  fn: (...args: any[]) => Promise<any>,
): Promise<boolean> => await fn().then(() => false, () => true)

describe(`USERS MODULE`, () => {
  it(`Should access the users database`, async () => {
    expect(fs.existsSync(USERS_DB_PATH)).toBeTruthy()
    expect(await didAsyncThrow(() => listUsersIDs())).toBeFalsy()
  })

  it(`Should create, get, update and delete users`, async () => {
    // Creating
    const usersIDsBeforeCreation = await listUsersIDs()
    const user = await createUser({
      name: 'test',
      email: 'test@gmail.com',
      address: 'Test Avenue, 1000',
    })
    const usersIDsAfterCreation = await listUsersIDs()
    expect(usersIDsBeforeCreation).not.toContain(user.id)
    expect(usersIDsAfterCreation).toContain(user.id)

    // Getting
    expect(user).toEqual(await getUser(user.id))

    // Updating
    const updatedUserData: UserData = {
      name: 'updated-test',
      email: 'updated-test@gmail.com',
      address: 'Updated Test Avenue, 1000',
    }
    const updatedUser = await updateUser(user.id, updatedUserData)
    expect(updatedUser).toEqual({ id: user.id, ...updatedUserData })

    // Deleting
    expect(await didAsyncThrow(() => getUser(user.id))).toBeFalsy() // User still exists
    await deleteUser(user.id)
    expect(await didAsyncThrow(() => getUser(user.id))).toBeTruthy() // Doesn't exists anymore
  })
})
