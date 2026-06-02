import { gql } from 'graphql-tag';


const usuarioTypeDefs =  gql `
    type Usuario {
        id_usuario: ID!
        usuario: String!
        nombre: String!
        activo: Boolean!
        rol: Rol!
    }

    extend type Query{
        usuarios: [Usuario]
    }
`;

export default usuarioTypeDefs;