import { gql } from 'graphql-tag';


const usuarioTypeDefs =  gql `
    type Usuario {
        id: ID!
        nombre: String!
        activo: Boolean!
        rol: Rol!
    }

    extend type Query{
        usuarios: [Usuario]
    }
`;

export default usuarioTypeDefs;