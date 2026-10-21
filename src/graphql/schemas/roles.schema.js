import { gql } from "graphql-tag";

const rolesTypeDefs = gql `
    type Rol{
        id_rol: ID!
        nombre: String!
        descripcion: String 
        activo: Boolean!
        permisos: [Permisos!]!
    }

    input CrearRolInput{
        nombre: String! 
        descripcion: String 
    }

    input ActualizarRolInput{
        nombre: String
        descripcion: String 
        activo: Boolean
    }

    extend type Query{
        roles: [Rol!]!
        rol(id_rol: ID!): Rol
    }

    extend type Mutation{
        crearRol(data: CrearRolInput!): Rol!
        actualizarRol(id_rol: ID!, data: ActualizarRolInput!): Rol!
        eliminarRol(id_rol: ID!): Boolean!
        asignarPermisosARol(id_rol: ID!, permisos: [ID!]!):Rol!
    }
`;

export default rolesTypeDefs;