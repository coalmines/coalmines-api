import {
  GraphQLDate,
  GraphQLTime,
  GraphQLDateTime,
} from 'graphql-iso-date';
import { coalMines } from '../queries/coalMines';
import { verticalTunnels } from '../queries/verticalTunnels';
import { addVerticalTunnel } from '../mutations/verticalTunnels';

const user = (obj, args, context) => context.user;

export const resolvers = {
  Query: {
    coalMines,
    verticalTunnels,
    user,
  },
  Mutation: {
    addVerticalTunnel,
  },
};

export const resolveFunctions = {
  Date: GraphQLDate,
  Time: GraphQLTime,
  DateTime: GraphQLDateTime,
};
