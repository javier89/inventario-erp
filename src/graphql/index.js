// ----- Schemas -----
import {baseTypeDefs} from "./schemas/base.schema.js";
import productoTypeDfs from './schemas/productos.schema.js';
import proveedorTypeDefs from "./schemas/proveedor.schema.js";
import loginTypeDefs from "./schemas/login.schema.js";
import usuarioTypeDefs from "./schemas/users.schema.js";
import rolTypeDefs from "./schemas/roles.schema.js";
import salidasTypeDefs from "./schemas/salida.schema.js";
import empleadosTypeDefs from "./schemas/empleados.schema.js";
import movimientosTypeDefs from "./schemas/movimientos.schema.js"
import asignacionesTypeDefs from "./schemas/asignaciones.schema.js";
import comprasTypeDefs from "./schemas/compras.schema.js";

    
// ----- Resolvers -----
import productoResolver from "./resolvers/productos.resolver.js";
import proveedorResolver from "./resolvers/proveedor.resolver.js";
import loginResolver   from "./resolvers/login.resolver.js";
import salidasResolver from "./resolvers/salida.resolver.js";
import empleadosResolver from "./resolvers/empleados.resolver.js";
import movimientosResolver from "./resolvers/movimientos.resolver.js";
import asignacionesResolver from "./resolvers/asignaciones.resolver.js";
import comprasResolver from "./resolvers/compras.resolver.js"



export const typeDefs = [
    baseTypeDefs,
    usuarioTypeDefs,
    rolTypeDefs,
    productoTypeDfs,
    proveedorTypeDefs,
    loginTypeDefs,
    salidasTypeDefs,
    empleadosTypeDefs,
    movimientosTypeDefs,
    asignacionesTypeDefs,
    comprasTypeDefs,
];



export const resolvers={
    Query: {
        ...(productoResolver.Query || {}),
        ...(loginResolver.Query || {}),
        ...(proveedorResolver.Query || {}),
        ...(salidasResolver.Query || {}),
        ...(empleadosResolver.Query || {}),
        ...(movimientosResolver.Query || {}),
        ...(asignacionesResolver.Query || {}),
        ...(comprasResolver.Query || {}),
    },
    Mutation: {
        ...(productoResolver.Mutation || {}),
        ...(proveedorResolver.Mutation || {}),
        ...(loginResolver.Mutation || {}),
        ...(salidasResolver.Mutation || {}),
        ...(empleadosResolver.Mutation || {}),
        ...(movimientosResolver.Mutation || {}),
        ...(asignacionesResolver.Mutation || {}),
        ...(comprasResolver.Mutation || {}),
    },
};


