import { gql } from "graphql-tag";

const rolTypeDefs = gql `
type Rol{
    id: ID!
    nombre: String!
}
`;

export default rolTypeDefs;


