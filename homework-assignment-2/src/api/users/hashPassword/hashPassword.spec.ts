import { hashPassword } from './hashPassword'

describe(`hashPassword`, () => {
  it('Should always return a string with 128 chars', async () => {
    const hashes = await Promise.all([
      hashPassword('test1'),
      hashPassword('a'),
      hashPassword(''),
      hashPassword('gnjrabghralbfrafyhrahfyragh74yt4y27th13982378ty4ft4qb'),
      hashPassword(
        'NVP8kMV%FlL!gqnESKYSXhZ1!Sf0x31OmJLYE4T5lXAG%4rbL!EouM4iF#r!2XjSEHrVn*$xt9@jsS#ISi24UIWx0IAdvPvmPNZj70Nn%w28P4sywQj9cgMlGmFWiALidRxhYI7$WC*EDRwTiB0N2*&t03unYw4hc0E04s0^Z19ZmOZViapO4*v5S3&t@vtb6hku*Aq^*NZA^GM7ikiFUAvxqN3nruNTvntwB%cMIQ@VQSCHQMAwVYI!2Tv8Ac^NFzLo94YTDnJz7mB$2NRq&%KqIp6koHB3g6kJrOPmO',
      ),
    ])

    hashes.forEach(hash => {
      expect(typeof hash).toBe('string')
      expect(hash.length).toBe(128)
    })
  })

  it('Should return the same result if given the same plain text', async () => {
    const plainTxt = 'testing-this-thing'

    const hash1 = await hashPassword(plainTxt)
    const hash2 = await hashPassword(plainTxt)

    expect(hash1).toEqual(hash2)
  })

  it('Should return diferent results if given diferent texts', async () => {
    const hash1 = await hashPassword('testing-this-thing-1')
    const hash2 = await hashPassword('testing-this-thing-2')

    expect(hash1).not.toEqual(hash2)
  })
})
