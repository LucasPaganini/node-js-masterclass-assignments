import { getUserByEmail } from './getUserByEmail'
import { myEmail } from '../../../config'

getUserByEmail(myEmail).then(console.log)
