import * as fs from 'fs'
import { didAsyncThrow } from '../utils'
import { SESSIONS_DB_PATH } from './SESSIONS_DB_PATH'
import { listSessionsTokens } from './listSessionsTokens'
import { createSession } from './createSession'
import * as users from '../users'
import { getSession } from './getSession'
import { extendSession } from './extendSession'
import { deleteSession } from './deleteSession'

describe(`SESSIONS MODULE`, () => {
  let user: users.User
  beforeAll(async () => {
    user = await users.createUser({
      name: 'test',
      email: 'test@gmail.com',
      address: 'Test Avenue, 1000',
      password: 'test123',
    })
  })

  afterAll(async () => {
    await users.deleteUser(user.id)
  })

  it(`Should access the sessions database`, async () => {
    expect(fs.existsSync(SESSIONS_DB_PATH)).toBeTruthy()
    expect(await didAsyncThrow(() => listSessionsTokens())).toBeFalsy()
  })

  it(`Should create, get, extend and delete sessions`, async () => {
    // Creating
    const sessionsBeforeCreation = await listSessionsTokens()
    const session = await createSession(user.id)
    const sessionsAfterCreation = await listSessionsTokens()
    expect(sessionsBeforeCreation).not.toContain(session.token)
    expect(sessionsAfterCreation).toContain(session.token)

    // Getting
    expect(session).toEqual(await getSession(session.token))

    // Extending
    const extendedDate = (await extendSession(session)).expiration
    expect(extendedDate).toBeGreaterThan(session.expiration)

    // Deleting
    expect(await didAsyncThrow(() => getSession(session.token))).toBeFalsy() // User still exists
    await deleteSession(session.token)
    expect(await didAsyncThrow(() => getSession(session.token))).toBeTruthy() // Doesn't exists anymore
  })
})
