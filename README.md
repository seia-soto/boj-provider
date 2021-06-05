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

Before starting, you need to create new provider instance with session key:

```js
const Provider = require('boj-provider')

const client = new Provider({
  session: 'session key'
})
```

- You can get your BOJ session key from [my another repo](https://github.com/seia-soto/boj-userspace-login).

## isLoggedIn

Returns `Promise` of `boolean` of login state.

```js
if (await client.isLoggedIn()) {
  console.log('Logged in!')
}
```

## getProfile

Returns `Promise` of `object` of user profile.

```js
const profile = await client.getProfile()

console.log(profile)

/*
{
  identifier: '',
  bio: '',
  school: '',
  email: 'user@domain.tld'
}
*/
```
