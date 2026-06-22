import {gql} from "graphql-tag";

const empleadosTypeDefs= gql`
    type Empleado {
        id_empleado: ID!
        nombre: String!
        cargo: String!
    }
    
    extend type Query {
        empleados:[Empleado!]!
        empleado(
            id_empleado:ID!
        ): Empleado!
    }

    extend type Mutation {
        crearEmpleado(
            nombre: String!
            cargo: String!
        ): Empleado!

        actualizarEmpleado( 
            id_empleado: ID! 
            nombre: String!
            cargo: String!
        ): Empleado!
        
        eliminarEmpleado(
            id_empleado: ID!
        ): Boolean!
    }
`;

export default empleadosTypeDefs;