import { gql } from 'apollo-server-koa';

export default gql`
  type CoalMine {
    "Every coal mine had a name, e.g., Zollverein"
    name: String!
    location: Location
  }
`;
