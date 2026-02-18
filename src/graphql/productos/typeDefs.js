import { gql } from 'graphql-tag';

const typeDefs = gql `
    type Producto {
        id_producto: ID!
        nombre: String!
        descripcion: String!
        precio: Float!
        activo: Boolean!
        createdAt: String!
        updatedAt: String!
        sku: String!
        stock: Int 
        HistorialPrecio: [HistorialPrecio!]!
    }
    type HistorialPrecio {
        precio: Float!
    }

    type CrearProductoResponse{
        ok: Boolean!
        message: String!
        producto: Producto
    }

    # --------
    # Inputs
    # --------

    input CrearProductoInput {
        nombre: String!
        descripcion: String
        precio: Float!
        sku: String!
        stock: Int
    }

    input ActualizarProductoInput{
        nombre: String
        codigo_barras: String
        stock: Int
    }

    input ActualizarProductoPorSkuInput {
        nombre: String
        codigo_barras: String
        stock: Int
    }
    
    # --------
    # Queries
    # --------

    extend type Query {
        productos: [Producto!]!
        producto(id: ID!): Producto
    }
    
    # --------
    # Mutations
    # --------


    extend type Mutation {
        crearProducto(data: CrearProductoInput!): CrearProductoResponse!
        actualizarProducto(id: ID!, data:ActualizarProductoInput!): Producto!
        actualizarProductoPorSku( sku: String!, data:ActualizarProductoPorSkuInput!): Producto!
        eliminarProducto(id: ID!): Boolean!

    }
`;

export default typeDefs;