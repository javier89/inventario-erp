import prisma from "../../config/prismaClient.js"

const empleadosResolver={
    Query:{
        empleados: async ()=>
            {
                const empleados = await prisma.empleado.findMany({
                    where:{
                        activo: true,
                    },
                    orderBy:{
                        nombre:"asc"
                    },
                });

                return empleados.map((empleado)=>({
                    ...empleado,
                    cargo: empleado.cargo || "Sin Cargo",
                }));
            } ,
    },

    Mutation:{
        crearEmpleado: async (_, {nombre, cargo})=>{
            const empleado= await prisma.empleado.create({
                data:{
                    nombre,
                    cargo,
                },
            });
            return empleado;
        },

        actualizarEmpleado: async (
            _,
            {
                id_empleado,
                nombre,
                cargo,
            }
        ) => {
            return await prisma.empleado.update({
                where:{
                    id_empleado: Number(id_empleado),
                },
                data:{
                    nombre,
                    cargo,
                },
            });
        },

        eliminarEmpleado: async (_, {
            id_empleado,
        })=>{
            await prisma.empleado.update({
                where:{
                    id_empleado: Number(id_empleado),
                },
                data:{
                    activo: false,
                }
            });
            return true;
        },
    },
};

export default empleadosResolver;