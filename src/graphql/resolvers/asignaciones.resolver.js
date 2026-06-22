import prisma from "../../config/prismaClient.js";

const asignacionesResolver={
    Query:{
        productosAsignadosPorEmpleado: async (_, {id_empleado})=>{
            const idEmpleado= Number(id_empleado);

            const empleado=await prisma.empleado.findUnique({
                where:{
                    id_empleado: idEmpleado,
                },
                select:{
                    id_empleado: true,
                    nombre: true,
                },
            });
            if(!empleado){
                throw new Error("Empleado no encontrado")
            }

            const movimientos=await prisma.movimiento.findMany({
                where:{
                    id_empleado: idEmpleado,
                    tipo_movimiento: "SALIDA"
                },
                include:{
                    Productos: true,
                },
            });

            const productosMap=new Map();
            movimientos.forEach((mov)=>{
                if(!mov.Productos) return;

                const idProducto=mov.Productos.id_producto;

                if(!productosMap.has(idProducto)){
                    productosMap.set(idProducto,{
                        id_producto: idProducto,
                        nombre:mov.Productos.nombre,
                        cantidad_total: 0,
                    });
                }
                productosMap.get(idProducto).cantidad_total+=mov.cantidad;
            });
            return {
                empleado,
                productos: Array.from(productosMap.values()),
            };
        },
    },
};

export default asignacionesResolver;