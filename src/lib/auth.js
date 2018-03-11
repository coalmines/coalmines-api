import passport from 'koa-passport';
import { Strategy as GitHubStrategy } from 'passport-github';
import {
  baseUrl,
  isProduction,
  gitHubClientId,
  gitHubClientSecret,
} from './env';
import { createLogger } from './logger';

const logger = createLogger('auth');

passport.serializeUser((user, done) => {
  // TODO: persist to user service
  switch (user.provider) {
    case 'github':
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
    default:
      return done('Provider not supported');
  }
});

if (isProduction && gitHubClientId) {
  const gitHubStrategy = new GitHubStrategy(
    {
      clientID: gitHubClientId,
      clientSecret: gitHubClientSecret,
      callbackURL: `${baseUrl}/auth/github/callback`,
    },
    (accessToken, refreshToken, profile, cb) => {
      logger.info('GitHub login', profile.username);
      cb(null, { provider: 'github', profile });
    },
  );
  passport.use(gitHubStrategy);
}

/**
 * Add authentication routes
 *
 * @param {object} router The router to use
 */
export default function addAuth(router) {
  router.get('/auth/github', passport.authenticate('github'));

  router.get(
    '/auth/github/callback',
    passport.authenticate(
      'github',
      { failureRedirect: '/auth/fail' },
    ),
    (ctx) => {
      ctx.redirect('/graphiql');
    },
  );
}
