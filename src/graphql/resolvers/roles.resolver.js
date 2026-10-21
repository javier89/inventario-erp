import prisma from "../../config/prismaClient.js";

const rolesResolver={
    Query:{
        roles: async()=>{
            const roles = await prisma.rol.findMany({
                where: { activo: true},
                orderBy:{nomre: "asc"},
                include:{ 
                    RolPermiso:{
                        include:{
                            Permiso: true,
                        },
                    },
                },
            });
            
            return roles.map((ro)=>({
                ...rol,
                permisos: rol.RolPermiso.map((rp)=> rp.Permisos),
            }));
        },

        rol: async(_, {id_rol})=>{
            const rol = await prisma.rol.findUnique({
                where:{ id_rol: Number(id_rol)},
                include:{
                    RolPermiso:{
                        include:{
                            Permiso: true,
                        },
                    },
                },
            });

            if(!rol) return null;

            return {
                ...rol,
                permisos: rol.RolPermiso.map((rp)=> rp.Permiso),
            };
        },
    },

    Mutation:{
        crearRol: async(_, { data })=>{
            return await prisma.rol.create({
                data:{
                    nombre: data.nombre,
                    descripcion: data.descripcion || null, 
                    activo: true,
                },
            });
        },

        actualizarRol: async(_, {id_rol, data })=>{
            return await prisma.rol.update({
                where: {id_rol: Number(id_rol)},
                data,
            });
        },

        eliminarRol: async(_,{id_rol})=>{
            await prisma.rol.update({
                where:{id_rol: Number(id_rol)},
                data:{activo: false},
            });

            return true;
        },

        asignarPermisosARol: async (_, {id_rol, permisos})=>{
            const rolId = Number(id_rol);

            await prisma.$transaction(async(tx)=>{
                await tx.rolPermisos.deleteMany({
                    where:{ id_rol: rolId},
                });
                await tx.rolPermiso.createMany({
                    data: permisos.map((id_permiso)=>({
                        id_rol:rolId,
                        id_permiso: Number(id_permiso),
                    })),
                });
            });

            const rol = await prisma.rol.findUnique({
                where:{ id_rol: rolId},
                include:{ 
                    RolPermiso:{ 
                        include:{ 
                            Permiso: true,
                        },
                    },
                },
            });

            return {
                ...rol,
                permisos: rol.RolPermiso.map((rp)=>rp.Permiso),
            };
        },
    },
};

export default rolesResolver;