import { gql } from 'apollo-server-koa';

export default gql`
  type Location {
    address: String!
    zipCode: String!
    city: String!
  }
`;
