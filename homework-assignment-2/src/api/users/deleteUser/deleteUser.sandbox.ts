import { deleteUser } from './deleteUser'

;(async () => {
  try {
    await deleteUser('0').then(_ => console.log('user deleted'))
  } catch (err) {
    console.log(err)
  }
})()
