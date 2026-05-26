import gql from "graphql-tag";

export const authTypeDefs = gql`
    type UsuarioAuth{
        id_usuario: ID!
        usuario: String! 
        nombre: String
        estado: String
        rol: String
    }

    type AuthResponse {
        token: String!
        usuario: UsuarioAuth!
    }
    
    extend type Mutation{
        login(usuario: String!, password: String!): AuthResponse
    }
`;