import {gql} from "graphql-tag";

const loginTypeDefs = gql`
    type AuthPayload {
        token: String!
        usuario: Usuario!
    }
    
    extend type Mutation {
        login(usuario: String!, password: String): AuthPayload!
    }
`;

export default loginTypeDefs;