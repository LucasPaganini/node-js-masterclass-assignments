import * as https from 'https'
import * as querystring from 'querystring'
import { mailgunKey } from '../../config'

export interface EmailHead {
  subject: string
  to: string[]
}

export const sendEmail = (head: EmailHead, body: string) => {
  return new Promise<any>((resolve, reject) => {
    const postData = querystring.stringify({
      ...head,
      from:
        'Mailgun Sandbox <postmaster@sandbox2666661496e14e16afb26f2f36dcb4b6.mailgun.org>',
      html: body,
    })

    const options: https.RequestOptions = {
      hostname: 'api.mailgun.net',
      port: 443,
      path: '/v3/sandbox2666661496e14e16afb26f2f36dcb4b6.mailgun.org/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': postData.length,
        Authorization: `api:${mailgunKey}`,
      },
    }

    const req = https.request(options, res => {
      let resData = ''
      res.on('error', reject)
      res.on('data', data => (resData += data))
      res.on('end', () => {
        try {
          console.log('data', resData)
          resolve(JSON.parse(resData))
        } catch (err) {
          reject(err)
        }
      })
    })

    req.on('error', reject)
    req.write(postData)
    req.end()
  })
}
