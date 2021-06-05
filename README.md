# boj-provider

Simple JavaScript object to provide static page fetcher and check authentication state.

## Table of Contents

- [Installation](#installation)
- [API](#api)

----

# Installation

You need to install this as GitHub repository.

```sh
yarn add git+https://github.com/seia-soto/boj-provider
```

# API

Please, refer cli usage.

```js
const args = process.argv.slice(2)

const Boj = require('../src')

const provider = new Boj({
  session: args[0]
})

provider
  .getAuthStatus()
  .then(status => console.log('Token status:', status))
```
