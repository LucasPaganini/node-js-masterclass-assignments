import { listUsersIDs } from './listUsersIDs'

;(async () => {
  const usersIDs = await listUsersIDs()
  console.log('usersIDs: ', usersIDs)
})()
