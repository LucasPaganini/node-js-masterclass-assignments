import { getUser } from './getUser'

;(async () => {
  try {
    console.log(await getUser('9469681205'))
  } catch (err) {
    console.log(err)
  }
})()
