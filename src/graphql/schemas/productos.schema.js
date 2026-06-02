import { gql } from 'graphql-tag';

const typeDefs = gql `
    
    scalar DateTime
    
    type Producto {
        id_producto: ID!
        nombre: String!
        activo: Boolean!         
        sku: String!
        stock: Int 
        unidad: String!
        HistorialPrecio: [HistorialPrecio!]!
        precio_producto: Float
    }

    type HistorialPrecio {
        id_historial: ID!
        precio_producto: Float!
        fecha: DateTime!
    }

    type CrearProductoResponse{
        ok: Boolean!
        message: String!
        producto: Producto
    }

    enum SortDirection{
        asc
        desc
    }

    type ProductoPagination{
        data:[Producto!]!
        total: Int!
        page: Int!
        pageSize: Int!
        totalPages: Int!
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

    input ProductoOrderByInput{
        field: String! # nombre | stock | precio
        direction: SortDirection = desc
    }
    
    input ProductoFilterInput{
        search: String
        nombre: String
        sku: String
        stockMin: Int
        stockMax: Int
        precioMin: Float
        precioMax: Float
        activo: Boolean = true
    }
    
    # --------
    # Queries
    # --------

    extend type Query {
        productos (page: Int=1, pageSize: Int=10, filters:ProductoFilterInput, orderBy: ProductoOrderByInput): ProductoPagination!
        producto  (id_producto: ID!): Producto
        
    }
    
    # --------
    # Mutations
    # --------


    extend type Mutation {
        crearProducto(data: CrearProductoInput!): CrearProductoResponse!
        actualizarProducto(id_producto: ID!, data:ActualizarProductoInput!): Producto!
        actualizarProductoPorSku( sku: String!, data:ActualizarProductoPorSkuInput!): Producto!
        eliminarProducto(id_producto: ID!): Boolean!

    }
`;

export default typeDefs;