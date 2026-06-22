import prisma from "../../config/prismaClient.js";

const movimientosResolver={
    Query:{
        movimientosSalida: async()=>{
            const movimientos=await prisma.movimiento.findMany({
                where:{
                    tipo_movimiento:"SALIDA"
                },
                orderBy:{
                    fecha_movimiento:"desc"
                },
                take:10,
                include:{
                    Productos: true,
                },
            });

            const empleadosId=[
                ...new Set(movimientos
                .map((mov) => mov.id_empleado)
                .filter(Boolean)
                ),
            ];

            const empleados=await prisma.empleado.findMany({
                where:{
                    id_empleado:{
                        in: empleadosId,
                    },
                },
                select:{
                    id_empleado: true,
                    nombre: true,
                },
            });

            const empleadoMap=new Map(empleados.map((empleado)=>[empleado.id_empleado, empleado]))

            return movimientos.map((mov)=>({
                id_movimiento: mov.id_movimiento,
                fecha_movimiento: mov.fecha_movimiento,
                tipo_movimiento: mov.tipo_movimiento,
                cantidad: mov.cantidad,
                stock_anterior: mov.stock_anterior,
                stock_nuevo: mov.stock_nuevo,

                producto: mov.Productos?{
                    id_producto:mov.Productos.id_producto,
                    nombre:mov.Productos.nombre,
                }: null,
                empleado:empleadoMap.get(mov.id_empleado)|| null,
            }));
        },
    },
};

export default movimientosResolver;