import {gql} from "graphql-tag";

const movimientoTypeDefs= gql`
    type MovimientoProducto{
        id_producto: ID!
        nombre: String
    }
    
    type MovimientoEmpleado{
        id_empleado: ID!
        nombre: String
    }
    
    type Movimiento{
        id_movimiento: ID!
        fecha_movimiento: Date
        tipo_movimiento: String
        cantidad: Int
        stock_anterior: Int
        stock_nuevo: Int

        producto: MovimientoProducto
        empleado: MovimientoEmpleado
    }

    extend type Query{
        movimientosSalida:[Movimiento!]
    }
`;

export default movimientoTypeDefs;