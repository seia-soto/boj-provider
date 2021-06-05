const args = process.argv.slice(2)

const Boj = require('../src')

const provider = new Boj({
  session: args[0]
})

const init = async () => {
  const status = await provider.isLoggedIn()

  if (!status) {
    throw new Error('Invalid token')
  }

  console.log(await provider.getProfile())
}

init()
