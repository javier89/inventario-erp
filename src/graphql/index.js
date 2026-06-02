// ----- Schemas -----
import {baseTypeDefs} from "./schemas/base.schema.js";
import productoTypeDfs from './schemas/productos.schema.js';
import proveedorTypeDefs from "./schemas/proveedor.schema.js";
import loginTypeDefs from "./schemas/login.schema.js";
import usuarioTypeDefs from "./schemas/users.schema.js";
import rolTypeDefs from "./schemas/roles.schema.js";

// ----- Resolvers -----
import productoResolver from "./resolvers/productos.resolver.js";
import proveedorResolver from "./resolvers/proveedor.resolver.js";
import loginResolver   from "./resolvers/login.resolver.js";



export const typeDefs = [
    baseTypeDefs,
    usuarioTypeDefs,
    rolTypeDefs,
    productoTypeDfs,
    proveedorTypeDefs,
    loginTypeDefs,
];



export const resolvers={
    Query: {
        ...(productoResolver.Query || {}),
        ...(loginResolver.Query || {}),
        ...(proveedorResolver.Query || {})
    },
    Mutation: {
        ...(productoResolver.Mutation || {}),
        ...(proveedorResolver.Mutation || {}),
        ...(loginResolver.Mutation || {}),
    },
};


