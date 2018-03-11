# Coal Mines API

## Description
This service exposes a [GraphQL](http://facebook.github.io/graphql/) API via
HTTP. It provides the main gateway for client applications.
It does not implement business logic. To separate concerns, this service honors
[the main ideas behind GraphQL](http://graphql.org/learn/thinking-in-graphs/).

The HTTP endpoints are defined through [Koa](https://github.com/koajs/koa).

### Live Version
A live version with the GraphiQL interface can be found at
[coalmines.ruhr](https://coalmines.ruhr/graphiql).

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
For each provider, set `[PROVIDER]_CLIENT_ID` and `[PROVIDER]_CLIENT_SECRET` to
the respective values the provider gives you.

Providers supported:

[x] GitHub
[ ] Twitter

## Logging
By default, log output is in plain console format. When running this service in
production mode, the output is in JSON format.

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
