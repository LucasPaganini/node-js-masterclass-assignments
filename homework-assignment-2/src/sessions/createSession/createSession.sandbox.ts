import { createSession } from './createSession'

;(async () => {
  try {
    console.log(await createSession('145'))
  } catch (err) {
    console.log(err)
  }
})()
