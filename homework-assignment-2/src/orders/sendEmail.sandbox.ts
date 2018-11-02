import { sendEmail } from './sendEmail'
import { myEmail } from '../config'

sendEmail(
  {
    to: [myEmail],
    subject: 'Manual testing',
  },
  'This is just a test',
).then(r => console.log(r))
