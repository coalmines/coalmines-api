import { gql } from 'apollo-server-koa';

export default gql`
  type VerticalTunnel {
    id: ID!
    "Every tunnel had a name, e.g., 12"
    name: String!
    aerf: Boolean @deprecated
  }
`;
