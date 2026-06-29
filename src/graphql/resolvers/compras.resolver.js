import prisma from "../../config/prismaClient.js";

const comprasResolver={
Query:{
    compras: async()=>{
        return await prisma.compra.findMany({
            orderBy:{
                fecha_compra:"desc",
            },
            include:{
                Detalle_Compra:true,
            },
        });
    },
    compra: async(_, {id_compra})=>{
        return await prisma.compra.findUnique({
            where:{
                id_compra: Number(id_compra),
            },
            include:{
                Detalle_Compra: true,
            },
        });
    },
},

    Mutation: {
        crearCompra: async(_, {input})=>{
            const {num_factura, form_pago, id_proveedor, detalles} = input;
            if(!detalles || detalles.length===0){
                throw new Error("La compra debe tener al menos  un producto");
            }
            const compra=await prisma.$transaction(async(tx)=>{
                const nuevaCompra = await tx.compra.create({
                    data:{
                        num_factura: num_factura || null,
                        form_pago: form_pago || null,
                        id_producto: Number(id_producto),
                        estado: "ABIERTA",
                    },
                });

                await tx.detalle_Compra.createMany({
                    data: detalles.map((item)=>({
                        id_compra: nuevaCompra.id_compra,
                        id_producto: Number(item.id_producto),
                        cantidad: Number(item.cantidad),
                        precio_producto: Number(item.precio_producto)
                    })),
                });
                const compraCompleta = await tx.compra.findUnique({
                    where:{
                        id_compra: nuevaCompra.id_compra
                    },
                    include:{
                        Detalle_Compra: true,
                    },
                });
                return {
                    ...compraCompleta,
                    detalle: compraCompleta.Detalle_Compra,
                };
            });
            return compra;
        },

        cerrarCompra: async (_,{id_compra})=>{
            try{
                const compra= await prisma.compra.update({
                    where: {
                        id_compra: Number(id_compra),
                    },
                    data: {
                        estado:"CERRADA",
                    },
                    include:{
                        Detalle_Compra: true,
                    },
                });
                return{
                    ...compra,
                    detalles: compra.Detalle_Compra,
                };
            }catch(error){
                throw new Error(error.message);
            }
        },

        cancelarCompra: async(_,{id_compra})=>
        {
            try{
                const compra= await prisma.compra.update({
                    where:{
                        id_compra: Number(id_compra),
                    },
                    data:{
                        estado: "CANCELADA",
                    },
                    include:{
                        Detalle_Compra: true,
                    },
                });
                return{
                    ...compra,
                    detalles: compra.Detalle_Compra
                };
            }catch(error){
                throw new Error(error.message);
            }
        },
    },
};
export default comprasResolver;