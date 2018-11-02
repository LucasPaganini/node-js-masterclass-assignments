import { Session } from '../Session'

export const validateSession = (maybeSession: any = {}): Session => {
  if (
    typeof maybeSession.token !== 'string' ||
    maybeSession.token.trim() === ''
  )
    throw new Error(
      `Invalid session data, token "${maybeSession.token}" is invalid`,
    )
  const token: string = maybeSession.token.trim()

  if (
    typeof maybeSession.expiration !== 'number' ||
    !Number.isInteger(maybeSession.expiration)
  )
    throw new Error(
      `Invalid user data, expiration "${maybeSession.expiration}" is invalid`,
    )
  const expiration: number = maybeSession.expiration

  if (
    typeof maybeSession.userID !== 'string' ||
    maybeSession.userID.trim() === ''
  )
    throw new Error(
      `Invalid session data, userID "${maybeSession.userID}" is invalid`,
    )
  const userID: string = maybeSession.userID

  return { token, expiration, userID }
}
