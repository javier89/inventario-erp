import prisma from "../../config/prismaClient.js";

const resolvers = {
    Query:{
        proveedores: async()=>{
            return await prisma.proveedor.findMany({
                orderBy: { 
                    nombre: "asc",
                },
            });
        },

        proveedor: async(_, { id_proveedor }) => {
            return await prisma.proveedor.findUnique({
                where: {id_proveedor: Number(id_proveedor)},
            });
        },
    },

    Mutation: {
        crearProveedor: async(_, { data }) => {
            return await prisma.proveedor.create({
                data,
            });
        },

        actualizarProveedor: async(_, { id_proveedor, data}) => {
            return await prisma.proveedor.update({
                where: {id_proveedor: Number(id_proveedor)},
                data,
            });
        },

        eliminarProveedor: async(_, {id_proveedor}) => {
            await prisma.proveedor.update({
                where: {id_proveedor: Number(id_proveedor)},
                data: {estado: "Activo"},
            });

            return true;
        },
    },
};

export default resolvers;