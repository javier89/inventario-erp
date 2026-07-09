import prisma from "../../config/prismaClient.js";

const comprasResolver={
    Query:{
        compras: async ()=>{
            const compras=await prisma.compra.findMany({
                orderBy:{
                    fecha_compra: "desc",
                },
            });
            return compras;
        },

        compra: async (__dirname,{id_compra})=>{
            const compra=await prisma.compra.findUnique({
                where:{
                    id_compra: Number(id_compra),
                },
            });
            if(!compra) return null;
            const detalles= await prisma.detalle_Compra.findMany({
                where:{
                    id_compra: Number(id_compra),
                },
            });
            return {
                ...compra,
                detalles,
            };
        },
    },

    Mutation:{
        crearCompra: async (_, {input})=>{
            const {num_factura, form_pago, id_proveedor, detalles}=input;
            if(!detalles || detalles.length === 0){
                throw new Error("La compra debe tener almenos un producto");
            }

            const compraCreada = await prisma.$transaction(async(tx)=>{
                const nuevaCompra= await tx.compra.create({
                    data:{
                        num_factura: num_factura || null,
                        form_pago: form_pago || null,
                        id_proveedor: Number(id_proveedor),
                        estado:"ABIERTA",
                    },
                });
                await tx.detalle_Compra.createMany({
                    data: detalles.map((item)=>({
                        id_compra: nuevaCompra.id_compra,
                        id_producto: Number(item.id_producto),
                        cantidad: Number(item.cantidad),
                        precio_producto: Number(item.precio_producto),
                    })),
                });

                const compraActualizada= await tx.compra.findUnique({
                    where:{
                        id_compra: nuevaCompra.id_compra,
                    },
                });
                const detallesCompra= await tx.detalle_Compra.findMany({
                    where:{
                        id_compra: nuevaCompra.id_compra,
                    },
                });

                return {
                    ...compraActualizada,
                    detalles: detallesCompra.map((detalle)=>({
                        ...detalle,
                        precio_producto: Number(detalle.precio_producto),
                        costo_total: detalle.costo_total
                        ? Number(detalle.costo_total) :
                        null, 
                    })),
                };
            });

            return compraCreada;
        },

        cerrarCompra: async(_, {id_compra})=>{
            try{
                const compraCerrada = await prisma.compra.update({
                    where:{
                        id_compra: Number(id_compra),
                    },
                    data: {
                     estado: "CERRADA"
                    },
                });

                const detalles = await prisma.detalle_Compra.findMany({
                    where:{
                        id_compra: Number(id_compra),
                    },
                });

                return {
                    ...compraCerrada,
                    detalles: detalles.map((detalle)=>({
                        ...detalle,
                        precio_producto: Number(detalle.precio_producto),
                        costo_total: detalle.costo_total 
                        ? Number(detalle.costo_total)
                        : null,
                    })),
                };
            }catch(error){
                throw new Error(error.message);
            }
        },

        cancelarCompra: async (_, {id_compra}) => {
            try{
                const compraCancelada= await prisma.compra.update({
                    where:{
                        id_compra: Number(id_compra),
                    },
                    data:{
                        estado:"CANCELADA",
                    },
                });

                const detalles = await prisma.detalle_Compra.findMany({
                    where: {
                        id_compra: Number(id_compra),
                    },
                });

                return {
                    ...compraCancelada,
                    detalles: detlles.map((detalle)=>({
                        ...detalle,
                        precio_producto: Number(detalle.precio_producto),
                        costo_total: detalle.csoto_total 
                        ? Number(detalle.costo_total)
                        : null,
                    })),
                };
            }catch(error){
                throw new Error(error.message);
            }
        },
    },
};
export default comprasResolver;