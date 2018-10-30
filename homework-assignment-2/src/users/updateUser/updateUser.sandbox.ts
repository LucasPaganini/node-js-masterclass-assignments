import { updateUser } from './updateUser'

;(async () => {
  try {
    await updateUser('9469681205', {
      name: 'Rafael S',
      email: 'r@gmail.com',
      address: 'aaa',
    }).then(u => {
      console.log('user updated!', u)
    })
  } catch (err) {
    console.log(err)
  }
})()
