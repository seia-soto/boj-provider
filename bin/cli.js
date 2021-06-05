const args = process.argv.slice(2)

const Boj = require('../src')

const provider = new Boj({
  session: args[0]
})

provider
  .getAuthStatus()
  .then(status => console.log('Token status:', status))
