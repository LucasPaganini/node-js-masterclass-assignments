import { sendEmail } from './sendEmail'
import { MY_EMAIL } from '../../config'

sendEmail(
  {
    to: [MY_EMAIL],
    subject: 'Manual testing',
  },
  'This is just a test',
).then(r => console.log(r))
