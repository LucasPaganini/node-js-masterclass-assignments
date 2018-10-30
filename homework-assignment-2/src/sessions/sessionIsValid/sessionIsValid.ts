import { Session } from '../Session'

export const sessionIsValid = (session: Session) =>
  Date.now() <= session.expiration
