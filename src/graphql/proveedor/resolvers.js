const resolvers = {
    Query:{
        proveedores: async(_, __, {prisma})=>{
            return prisma.proveedor.findMany({
                where: { activo: true},
            });
        },

        proveedor: async(_, { id }, { prisma }) => {
            return prisma.proveedor.findUnique({
                where: {id: Number(id)},
            });
        },
    },

    Mutation: {
        crearProveedor: async(_, { data }, { prisma }) => {
            return prisma.proveedor.create({
                data:{
                    ...data,
                    activo: true,
                },
            });
        },

        actualizarProveedor: async(_, { id, data}, {prisma}) => {
            return prisma.proveedor.update({
                where: {id: Number(id)},
                data,
            });
        },

        eliminarProveedor: async(_, {id}, {prisma}) => {
            await prisma.proveedor.update({
                where: {id: Number(id)},
                data: {activo:false},
            });

            return true;
        },
    },
};

export default resolvers;