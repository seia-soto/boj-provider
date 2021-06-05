const got = require('got')
const cheerio = require('cheerio')

module.exports = class BojProvider {
  opts = {}
  fetcher = null

  constructor (opts = {}) {
    if (!opts.session) {
      throw new Error('Failed to initialize provider instance with session key! You should get it first.')
    }

    this.opts = opts
    this.fetcher = got.extend({
      prefixUrl: 'https://www.acmicpc.net',
      headers: {
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': ' ko,en;q=0.9,ja;q=0.8,ko-KR;q=0.7',
        'cache-control': 'no-cache',
        cookie: 'OnlineJudge=' + opts.session,
        dnt: 1,
        pragma: 'no-cache',
        referer: 'https://www.acmicpc.net/',
        'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
        'sec-ch-ua-mobile': '?0',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': 1,
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36'
      }
    })
  }

  async isLoggedIn () {
    const response = await this.fetcher.get('modify', {
      followRedirect: false
    })

    return response.statusCode === 200
  }

  async getProfile () {
    const response = await this.fetcher.get('modify')
    const $ = cheerio.load(response.body)

    const presets = {
      아이디: 'identifier',
      '상태 메시지': 'bio',
      학교: 'school',
      이메일: 'email'
    }
    const result = {}

    $('form#signupForm > div.form-group').each((index, element) => {
      const key = $('label', element).text().trim()

      if (!presets[key]) {
        return
      }

      result[presets[key]] = $('input', element).attr('value').trim()
    })

    return result
  }
}
