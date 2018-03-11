// Koa is our HTTP server
import Koa from 'koa';
import koaBody from 'koa-bodyparser';
import session from 'koa-session';
import Router from 'koa-router';
import passport from 'koa-passport';
// Apollo server :)
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';
// GraphQL schemas defined in this app
import mainSchema from './schemas/main';
// Passport auth integration
import addAuth from './lib/auth';

import { createLogger } from './lib/logger';
import { port, appSecret } from './lib/env';

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
 * body parser middleware for POST requests
 */
app.use(koaBody({ jsonLimit: '10mb' }));

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
 * main
 */
function main(ctx, next) {
  const context = {};
  if (ctx.session.passport) {
    const { user } = ctx.session.passport;
    context.user = user;
  }
  return graphqlKoa({
    schema: mainSchema,
    context,
  })(ctx, next);
}
router.post('/graphql', main);
router.get('/graphql', main);
router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

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
 * launch the server
 */
app.listen(port, () => {
  logger.info(`I'm listening :${port}`);
});
