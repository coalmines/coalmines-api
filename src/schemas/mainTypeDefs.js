/**
 * @file Main schema definitions
 *
 * Since graphql-tag dropped support for the description directives they had
 * introduced in 2.4.0, and it didn't put them in the proper place for them to
 * show up anyway, we are currently using simple string templates.
 * Otherwise the API would be missing the documentation when running
 * introspection queries like GraphiQL does.
 *
 * Use a hash (`#`) followed by exactly one space and then the brief explanation
 * before the type, field or scalar definition to describe it. Example:
 * ```
 * # You only live once
 * type Bar {
 *   # The foo is in the bar
 *   foo: Foo
 * }
 * ```
 *
 * Use the directive `@deprecated(reason: "Your reason here")` for deprecation
 * after a definition and a space on the same line. The reason is optional, but
 * it should be provided for a better understanding of the deprecation and to
 * explain which other field(s) to use instead.
 *
 * @see http://dev.apollodata.com/tools/graphql-tools/generate-schema.html#modularizing
 *
 * TODO: Look into schema stitching
 * @see https://www.apollographql.com/docs/graphql-tools/schema-stitching.html
 */
import CoalMine from '../types/coalMine';
import Location from '../types/location';
import User from '../types/user';

export default `
  ${CoalMine}
  ${Location}
  ${User}
  scalar Date
  scalar Time
  scalar DateTime
  type Query {
    coalMines: [CoalMine]
    user: User
  }
`;
