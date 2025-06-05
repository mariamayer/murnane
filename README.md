# Project M Plus

> WordCamp Nuxt.js demo with updated packages

## Built With (in additional to the CLI installation)

* @nuxtjs/dotenv
* @nuxtjs/google-anatlyics
* @nuxtjs/redirect-module
* @nuxtjs/robots
* @nuxtjs/sitemap
* @sentry/.. (additional error handling)
* nuxt-env (evn variables in code)
* nuxt-trailingslash-module
* vee-validate
* more but are probably project specifics

## Build Setup

``` bash
# install dependencies (local)
$ npx -p node@12 npm ci

# install dependencies (server)
$ npm ci

# serve with hot reload at localhost:3000
$ npx -p node@12 npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate

# run application options
$ cd directory on server
$ pm2 start npm --name "mplus" -- start
$ or
$ pm2 start npm -i 2 --name "mplus" -- start
$ cluster mode: pm2 start npm -i 2 --name "mplus" -- start

# pm2 operations
$ cd directory
$ pm2 stop ID / all
$ pm2 delete ID / all
$ pm2 restart all
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
