import getenv from 'getenv';

export const env = getenv('NODE_ENV', 'development');
export const isProduction = (env === 'production');
export const appSecret = getenv('APP_SECRET');
export const port = getenv('PORT');
