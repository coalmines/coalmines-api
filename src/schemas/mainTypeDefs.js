/**
 * @file Main schema definitions
 *
 * Use double quotes around descriptions right before the type, field or scalar
 * definition, or triple double quotes for blocks. Markdown is supported.
 * @see https://www.apollographql.com/docs/apollo-server/essentials/schema.html#documentation
 * Example:
 * ```
 * "You only live once"
 * type Bar {
 *   """
 *   The foo is in the [bar](https://example.com/bar)
 *   """
 *   foo: Foo
 * }
 * ```
 *
 * Use the directive `@deprecated(reason: "Your reason here")` for deprecation
 * after a definition and a space on the same line. The reason is optional, but
 * it should be provided for a better understanding of the deprecation and to
 * explain which other field(s) to use instead.
 *
 * TODO: Look into schema stitching
 * @see https://www.apollographql.com/docs/graphql-tools/schema-stitching.html
 * @see https://www.apollographql.com/docs/apollo-server/features/schema-stitching.html
 */
import { gql } from 'apollo-server-koa';

import CoalMine from '../types/coalMine';
import Location from '../types/location';
import User from '../types/user';

const types = gql`
  scalar Date
  scalar Time
  scalar DateTime
  type Query {
    coalMines: [CoalMine]
    user: User
  }
`;

export default [
  CoalMine,
  Location,
  User,
  types,
];
