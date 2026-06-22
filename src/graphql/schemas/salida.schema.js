import {gql} from "graphql-tag";

const salidasTypeDefs = gql`
    type Salida {
        id_salida: ID!
        fecha_salida: Date
        motivo: String
        id_empleado: ID!
        Detalle_Salida: [DetalleSalida!]!
    }
    
    type DetalleSalida{
        id_detalle_salida: ID!
        id_salida: ID!
        id_producto: ID!
        cantidad: Int!
    }

    input CrearDetalleSalidaInput{
        id_producto: ID!
        cantidad: Int!
    }
    
    input crearSalidaInput{
        id_empleado: ID!
        motivo: String
        detalle: [CrearDetalleSalidaInput!]!
    }
    extend type Mutation {
        crearSalidaProducto(input: crearSalidaInput!): Salida!
    }
`;

export default salidasTypeDefs;