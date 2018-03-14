import getenv from 'getenv';

export const env = getenv('NODE_ENV', 'development');
export const isProduction = (env === 'production');
export const appSecret = getenv('APP_SECRET');
export const port = getenv('PORT');
export const baseUrl = getenv('APP_URL', `http://localhost:${port}`);

export const gitHubClientId = getenv('GITHUB_CLIENT_ID', '');
export const gitHubClientSecret = getenv('GITHUB_CLIENT_SECRET', '');
export const twitterConsumerKey = getenv('TWITTER_CONSUMER_KEY', '');
export const twitterConsumerSecret = getenv('TWITTER_CONSUMER_SECRET', '');
