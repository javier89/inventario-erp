import baseTypeDefs from "./base.typeDefs.js";

import productoResolver from "./productos/resolvers.js";
import productoTypeDfs from './productos/typeDefs.js';

import proveedorTypeDefs from "./proveedor/typeDefs.js";
import proveedorResolver from "./proveedor/resolvers.js";

import loginTypeDefs from "./login/typeDefs.js";
import loginResolver from "./login/resolvers.js";

import usuarioTypeDefs from "./users/typeDefs.js";
import rolTypeDefs from "./roles/typeDefs.js";

export const typeDefs = [
    baseTypeDefs,
    usuarioTypeDefs,
    rolTypeDefs,
    productoTypeDfs,
    proveedorTypeDefs,
    loginTypeDefs,
];

// export const resolvers=[
//     productoResolver,
//     proveedorResolver,
//     loginResolver
// ];  

export const resolvers={
    Query: {
        ...productoResolver.Query,
        ...proveedorResolver.Query
    },
    Mutation: {
        ...productoResolver.Mutation,
        ...proveedorResolver.Mutation,
        ...loginResolver.Mutation,
    },
};


