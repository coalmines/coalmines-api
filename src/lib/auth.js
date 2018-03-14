import passport from 'koa-passport';
import { Strategy as GitHubStrategy } from 'passport-github';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import {
  baseUrl,
  isProduction,
  gitHubClientId,
  gitHubClientSecret,
  twitterConsumerKey,
  twitterConsumerSecret,
} from './env';
import { createLogger } from './logger';

const logger = createLogger('auth');

// Routes... we need lots of routes :)
const gitHubAuthRoute = '/auth/github';
const gitHubCbRoute = `${gitHubAuthRoute}/callback`;
const twitterAuthRoute = '/auth/twitter';
const twitterCbRoute = `${twitterAuthRoute}/callback`;

const failureRedirect = '/auth/fail';
const successRedirect = (ctx) => {
  ctx.redirect('/graphiql');
};

passport.serializeUser((user, done) => {
  // TODO: persist to user service
  switch (user.provider) {
    case 'github':
      return done(null, user.profile);
    case 'twitter':
      return done(null, user.profile);
    default:
      return done('Provider not supported');
  }
});

passport.deserializeUser(async (user, done) => {
  // TODO: fetch from user service
  switch (user.provider) {
    case 'github':
      return done(null, user.id);
    case 'twitter':
      return done(null, user.id);
    default:
      return done('Provider not supported');
  }
});

/**
 * Add authentication routes
 *
 * @param {object} router The router to use
 */
export default function addAuth(router) {
  // GitHub
  if (isProduction) {
    if (gitHubClientId) {
      const gitHubStrategy = new GitHubStrategy(
        {
          clientID: gitHubClientId,
          clientSecret: gitHubClientSecret,
          callbackURL: `${baseUrl}${gitHubCbRoute}`,
        },
        (accessToken, refreshToken, profile, cb) => {
          logger.info('GitHub login', profile.username);
          cb(null, { provider: 'github', profile });
        },
      );
      passport.use(gitHubStrategy);
      router.get(gitHubAuthRoute, passport.authenticate('github'));
      router.get(
        gitHubCbRoute,
        passport.authenticate('github', { failureRedirect }),
        successRedirect,
      );
      logger.info('GitHub authentication enabled');
    } else {
      logger.info('GitHub authentication disabled due to missing credentials');
    }
    // Twitter
    if (twitterConsumerKey) {
      const twitterStrategy = new TwitterStrategy(
        {
          consumerKey: twitterConsumerKey,
          consumerSecret: twitterConsumerSecret,
          callbackURL: `${baseUrl}${twitterCbRoute}`,
        },
        (accessToken, refreshToken, profile, cb) => {
          logger.info('Twitter login', profile.username);
          cb(null, { provider: 'twitter', profile });
        },
      );
      passport.use(twitterStrategy);
      router.get(twitterAuthRoute, passport.authenticate('twitter'));
      router.get(
        twitterCbRoute,
        passport.authenticate('twitter', { failureRedirect }),
        successRedirect,
      );
      logger.info('Twitter authentication enabled');
    } else {
      logger.info('Twitter authentication disabled due to missing credentials');
    }
  }
}
