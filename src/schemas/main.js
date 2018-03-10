import {
  makeExecutableSchema,
  addResolveFunctionsToSchema,
} from 'graphql-tools';
import {
  GraphQLDate,
  GraphQLTime,
  GraphQLDateTime,
} from 'graphql-iso-date';
import { coalMines } from '../queries/coalMines';
import typeDefs from './mainTypeDefs';
import logger from '../lib/logger';

const resolvers = {
  Query: {
    coalMines,
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers, logger });
export default schema;

const resolverMap = {
  Date: GraphQLDate,
  Time: GraphQLTime,
  DateTime: GraphQLDateTime,
};

addResolveFunctionsToSchema(
  schema,
  resolverMap,
);
