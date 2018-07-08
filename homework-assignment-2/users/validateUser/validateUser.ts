import { User } from '../User'

export const validateUser = (data: any = {}): User => {
  if (typeof data.id !== 'string' || data.id.trim() === '')
    throw new Error(`Invalid user data, id "${data.id}" is invalid`)
  const id: string = data.id.trim()

  if (typeof data.name !== 'string' || data.name.trim() === '')
    throw new Error(`Invalid user data, name "${data.name}" is invalid`)
  const name: string = data.name.trim()

  if (typeof data.address !== 'string' || data.address.trim() === '')
    throw new Error(`Invalid user data, address "${data.address}" is invalid`)
  const address: string = data.address.trim()

  if (typeof data.email !== 'string' || data.email.trim() === '')
    throw new Error(`Invalid user data, email "${data.email}" is invalid`)
  const email: string = data.email.trim()

  return { id, name, email, address }
}
