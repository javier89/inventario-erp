import prisma from "../../config/prismaClient.js";

const permisosResolver={
    Query:{
        permisos: async ()=>{
            return await prisma.permisos.findMany({
                where: { activo: true },
                orderBy:[
                    {modulo: "asc"},
                    {nombre: "asc"},
                ],
            });
        },

        permisosPorModulo: async (_,{modulo})=>{
            return await prisma.permisos.findMany({
                where:{
                    modulo,
                    activo: true,
                },
                orderBy:{ nombre: "asc"},
            });
        },
    },

    Mutation:{
        crearPermiso: async(_, {data})=>{
            return await prisma.permisos.create({
                data:{
                    codigo: data.codigo,
                    nombre: data.nombre,
                    descripcion: data.descripcion || null,
                    modulo: data.modulo,
                    activo: true,
                },
            });
        },

        actualizarPermiso: async(_, {id_permiso, data})=>{
            return await prisma.permisos.update({
                where: { id_permiso: Number(id_permiso) },
                data,
            });
        },

        eliminarPermiso:async(_, {id_permiso})=>{
            await prisma.permisos.update({
                where: {id_permiso: Number(id_permiso)},
                data: {activo: flase},
            });
            return true;
        },
    },
};

export default permisosResolver;