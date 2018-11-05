import { createSession } from './createSession'

;(async () => {
  try {
    console.log(await createSession('145', '123'))
  } catch (err) {
    console.log(err)
  }
})()
