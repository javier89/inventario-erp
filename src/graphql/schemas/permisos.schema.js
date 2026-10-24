import {gql} from "graphql-tag";

const permisosTypeDefs = gql` 
    type Permisos {
        id_permiso: ID!
        codigo: String!
        nombre: String!
        descripcion: String
        modulo: String!
        activo: Boolean!
    }

    input CrearPermisoInput{
        codigo: String!
        nombre: String!
        descripcion: String
        modulo: String!
    }

    input ActualizarPermisoInput{
        codigo: String
        nombre: String
        descripcion: String
        modulo: String
        activo: Boolean
    }

    extend type Query{
        permisos: [Permisos!]!
        permisosPorModulo(modulo: String!): [Permisos!]!
    }

    extend type Mutation{
        crearPermiso(data: CrearPermisoInput!): Permisos!
        actualizarPermiso(id_permiso: ID!, data: ActualizarPermisoInput!): Permisos!
        eliminarPermiso(id_permiso: ID!): Boolean!
    }
`;

export default permisosTypeDefs;