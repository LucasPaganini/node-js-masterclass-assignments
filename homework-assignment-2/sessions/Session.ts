type Timestamp = number
export interface Session {
  token: string
  expiration: Timestamp
  userID: string
}
