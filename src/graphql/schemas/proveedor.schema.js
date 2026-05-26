import {gql} from "graphql-tag";

const proveedorTypeDefs = gql`
    type Proveedor {
        id: ID!
        nombre: String!
        email: String
        telefono: String
        activo: Boolean!
        createdAt: String!
        updatedAt: String!
    }

        # --------
        # Inputs
        # --------
    input CrearProveedorInput{
        nombre: String
        email: String
        telefono: String
    }
        input ActualizarProveedorInput{
            nombre: String
            email: String 
            telefono: String
            activo: Boolean
        }

        # --------
        # Query
        # --------
    extend type Query{
        proveedores: [Proveedor!]!
        proveedor (id: ID!): Proveedor
    }
    
        # --------
        # Mutations
        # --------
    extend type Mutation{
        crearProveedor(data: CrearProveedorInput!): Proveedor!
        actualizarProveedor(
            id: ID!
            data: ActualizarProveedorInput!
        ): Proveedor!
        eliminarProveedor(id: ID!): Boolean!
    }
`;

export default proveedorTypeDefs