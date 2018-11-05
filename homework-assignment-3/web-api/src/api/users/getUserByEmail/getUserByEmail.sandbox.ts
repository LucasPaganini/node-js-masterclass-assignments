import { getUserByEmail } from './getUserByEmail'
import { MY_EMAIL } from '../../../config'

getUserByEmail(MY_EMAIL).then(console.log)
