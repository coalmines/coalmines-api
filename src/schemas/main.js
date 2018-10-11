import {
  GraphQLDate,
  GraphQLTime,
  GraphQLDateTime,
} from 'graphql-iso-date';
import { coalMines } from '../queries/coalMines';
import typeDefs from './mainTypeDefs';

const user = (obj, args, context) => context.user;

export const resolvers = {
  Query: {
    coalMines,
    user,
  },
};

export const resolveFunctions = {
  Date: GraphQLDate,
  Time: GraphQLTime,
  DateTime: GraphQLDateTime,
};
