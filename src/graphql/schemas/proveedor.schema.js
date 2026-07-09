import {gql} from "graphql-tag";

const proveedorTypeDefs = gql`
    type Proveedor {
        id_proveedor: ID!
        nombre: String!
        email: String
        telefono: String
        direccion: String
        rfc: String
        contacto_ventas: String
        estado: String
    }

        # --------
        # Inputs
        # --------
    input CrearProveedorInput{
        nombre: String
        email: String
        telefono: String
        direccion: String
        rfc: String
        contact_ventas: String
        estado: String

    }
        input ActualizarProveedorInput{
            nombre: String
            email: String 
            telefono: String
            direccion: String
            rfc: String
            contacto_ventas: String
            estado: String
        }

        # --------
        # Query
        # --------
    extend type Query{
        proveedores: [Proveedor!]!
        proveedor (id_proveedor: ID!): Proveedor
    }
    
        # --------
        # Mutations
        # --------
    extend type Mutation{
        crearProveedor(data: CrearProveedorInput!): Proveedor!
        actualizarProveedor(
            id_proveddor: ID!
            data: ActualizarProveedorInput!
        ): Proveedor!
        eliminarProveedor(id_proveedor: ID!): Boolean!
    }
`;

export default proveedorTypeDefs