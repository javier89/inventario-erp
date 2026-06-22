import {gql} from "graphql-tag";

const asignacionesTypeDefs=gql`
    type AsignacionEmpleado {
        id_empleado: ID!
        nombre: String!
    }
    
    type ProductoAsignado {
        id_producto: ID!
        nombre: String!
        cantidad_total: Int!
    }
    
    type AsignacionProductosEmpleado{
        empleado: AsignacionEmpleado
        productos: [ProductoAsignado!]!
    }

    extend type Query{
        productosAsignadosPorEmpleado(
            id_empleado: ID!
        ): AsignacionProductosEmpleado!
    }
`;

export default asignacionesTypeDefs;