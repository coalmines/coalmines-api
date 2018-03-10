import bunyan, { TRACE } from 'bunyan';
import { ConsoleLogger } from '@cdm-logger/server';
import { isProduction } from './env';

export const createLogger = (name) => {
  const logger = (isProduction
    ? bunyan.createLogger({ name, level: TRACE })
    : ConsoleLogger.create(name)
  );
  // Apollo requires logger.log for error logging support
  logger.log = logger.error;
  return logger;
};

export default createLogger('main');
