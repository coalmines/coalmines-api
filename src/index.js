// Koa is our HTTP server
import Koa from 'koa';
import session from 'koa-session';
import Router from 'koa-router';
import passport from 'koa-passport';
// Apollo server :)
import { ApolloServer } from 'apollo-server-koa';
// GraphQL schemas defined in this app
import typeDefs from './schemas/mainTypeDefs';
import { resolvers, resolveFunctions } from './schemas/main';
// Passport auth integration
import addAuth from './lib/auth';

import { createLogger } from './lib/logger';
import { graphqlEndpoint, port, appSecret } from './lib/env';

const logger = createLogger('koa');
const app = new Koa();

/**
 * request error handling
 * @see https://github.com/koajs/koa/blob/master/docs/error-handling.md
 */
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    // will only respond with JSON
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = { message: err.message };
    logger.warn('Request error', err.message);
  }
});

/**
 * Session setup
 * @see https://github.com/koajs/session
 */
app.keys = [appSecret];
app.use(session(app));

app.use(passport.initialize());
app.use(passport.session());

/**
 * routes
 */
const router = new Router();

addAuth(router);

/**
 * pass the context to Apollo Server
 */
function passContext({ ctx }) {
  if (ctx.session.passport) {
    const { user } = ctx.session.passport;
    return { user };
  }
  return {};
}

app.use(router.routes());
app.use(router.allowedMethods());

/**
 * Application error handling
 * @see https://github.com/koajs/koa/blob/master/docs/api/index.md#error-handling
 */
app.on('error', (err, ctx = {}) => {
  logger.error('Server error', err, ctx.session);
});

/**
 * Both introspection and GraphQL Playground are enabled here. Note that these
 * are *not* meant for actual production APIs. As this here is for showcasing,
 * acting as a playground thusly, both are enabled. For details, see also:
 * https://www.apollographql.com/docs/apollo-server/testing/graphql-playground/
 */
const server = new ApolloServer({
  typeDefs,
  resolvers,
  resolveFunctions,
  context: passContext,
  introspection: true,
  playground: true,
});
server.applyMiddleware({ app, path: graphqlEndpoint });

/**
 * launch the server
 */
app.listen(port, () => {
  logger.info(`I'm listening :${port}`);
});
