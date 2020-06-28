# roebling

[![Netlify Status](https://api.netlify.com/api/v1/badges/17e0e91a-307c-497d-aece-220ce93f0325/deploy-status)](https://app.netlify.com/sites/competent-brattain-b5e842/deploys)

This is a small web-app that I'm making to make my (soon-to-be) apartment life easier. This is very much a to-do, but a brief sketch of what the app should support:

* creating "homes" and user accounts
* a list of recipes in each home
* a list of ingredients in each home
* tying which recipes can be created given the current ingredients
* given a current number of people and ingredients, what recipes should be doable (for a day, week, etc.)
* given the list of ingredients, what needs to be topped-up next grocery run
* and more!

Give me some time, and there will be more to see here! In the meantime, you can toy with the instance I've set up at [roebling.matthewwang.me](https://roebling.matthewwang.me).

Under the hood, this app is written in React and Firebase, and uses Typescript. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Development Setup

To start developing, we'll follow our typical Node project workflow. You'll need a copy of [Node.js](https://nodejs.org/en/) on your computer; this was developed with the LTS version, `12.18`.

First, let's grab our repository with `git`:

```sh
$ git clone https://github.com/malsf21/roebling-web.git
...
$ cd roebling-web
```

Then, we'll install and run our app. We recommend using [`yarn`](https://yarnpkg.com/), like so:

```sh
$ yarn
$ yarn start
Compiled successfully!

You can now view roebling-web in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.5:3000

Note that the development build is not optimized.
To create a production build, use yarn build.
```

But, if you'd prefer, you can also use `npm`:

```sh
$ npm install
$ npm start
Compiled successfully!

You can now view roebling-web in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.5:3000

Note that the development build is not optimized.
To create a production build, use yarn build.
```

CRA should automatically open your default browser and open the app, but you can also visit the options presented in the command-line interface.