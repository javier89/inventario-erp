import {gql} from "graphql-tag";

const comprasTypeDefs= gql`
    type DetalleCompra {
        id_detalle: ID!
        id_compra: ID!
        id_producto: ID!
        cantidad: Int!
        precio_producto: Float!
        estado_compra: String
        costo_total: Float
    }
    type Compra {
        id_compra: ID!
        fecha_compra: Date
        total_compra: Float
        num_factura: String
        form_pago: String
        id_proveedor: ID
        estado: String
        detalles:[DetalleCompra!]!
    }
    
    input DetalleCompraInput{
        id_producto: ID!
        cantidad: Int!
        precio_producto: Float!
    }

    input CrearCompraInput{
        num_factura: String
        form_pago: String
        id_proveedor: ID!
        detalles: [DetalleCompraInput!]!
    }

    extend type Mutation{
        crearCompra(input: CrearCompraInput!): Compra!
        cerrarCompra(id_compra: ID!): Compra!
        cancelarCompra(id_compra: ID!): Compra!
    }

    extend type Query{
        compras: [Compra!]!
        compra(id_compra: ID!): Compra
    }
`;

export default comprasTypeDefs;