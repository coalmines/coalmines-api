# Coal Mines API

![Build Status](https://api.cirrus-ci.com/github/coalmines/coalmines-api.svg)

## Description
This service exposes a [GraphQL](http://facebook.github.io/graphql/) API via
HTTP. It provides the main gateway for client applications.
It does not implement business logic. To separate concerns, this service honors
[the main ideas behind GraphQL](http://graphql.org/learn/thinking-in-graphs/).

The HTTP endpoints are defined through [Koa](https://github.com/koajs/koa).

### Live Version
A live version of this project can be found at [coalmines.ruhr](https://coalmines.ruhr).

### UI
As of Apollo Server 2, GraphQL Playground is available on `/graphql` as a UI.
However, it is not sending cookies, breaking cookie-based authentication.
For a [workaround](https://github.com/prisma/graphql-playground/issues/748#issuecomment-412524510),
open the settings in the UI (gear icon in the upper right), and set
`"request.credentials": "same-origin"`.

For a consistent user experience, GraphiQL is still available on `/graphiql`.

## Requirements
- Node.js
- npm
- Babel CLI tools

## Environment Variables
See `env.sh`. Set `NODE_ENV` to `production` for production mode.

### OAuth Support
For authentication integration, you will need to set up the app for the
respective authentication provider first. Then set `APP_URL` to match the
protocol and host where you deployed the app, e.g., `https://coalmines.ruhr`.
For each provider, set the environment variables for the credentials to
the respective values the provider gives you.

Providers supported:

- [x] GitHub: `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`
- [x] Twitter: `TWITTER_CONSUMER_KEY` and `TWITTER_CONSUMER_SECRET`

## Logging
By default, log output is in plain console format. When running this service in
production mode, the output is in JSON format.

## Health Check
A health check endpoint implementing
[Nadareishvili's IETF draft](https://tools.ietf.org/id/draft-inadarei-api-health-check-01.html)
is available at `/.well-known/apollo/server-health`.

## Running and Building
To run the app, set the necessary environment variables based on the file
`env.sh`.

Run the application in watch mode for development purposes:
```sh
npm start
```

### Building the Application
You should provide the requirements as stated above through your build system.
```sh
make distclean && make
```

If your binaries are in paths other than defined in the `Makefile`, you can
specify them, for example:
```sh
make distclean && make NODE=/usr/local/bin/node8
```

To create a tarball (by default put in `build/bundle.tar.gz`):
```sh
make dist
```

### TL;DR
```sh
make distclean && make && make dist
```
