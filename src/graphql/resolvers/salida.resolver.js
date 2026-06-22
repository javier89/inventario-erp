import prisma from "../../config/prismaClient.js";

const salidasResolver = 
{
    Mutation:
    {
        crearSalidaProducto: async(_, { input }) =>
        {
            const {id_empleado, motivo, detalle} = input;

            if(!detalle || detalle.length === 0)
            {
                throw new Error("La salida debe tener almenos un producto");
            }

            for(const item of detalle)
            {
                if(item.cantidad <= 0)
                {
                    throw new Error("La cantidad debe ser mayor a cero");
                }
            }

            try{
                const salida = await prisma.$transaction(async (tx) => {
                    const nuevaSalida = await tx.salida.create({
                        data: {
                            id_empleado: Number(id_empleado),
                            motivo: motivo || null,
                        },
                        select:{
                            id_salida: true,
                            fecha_salida: true,
                            motivo: true,
                            id_empleado: true,
                        }
                    });

                    await tx.detalle_Salida.createMany({
                        data: detalle.map((item) => ({
                            id_salida: nuevaSalida.id_salida,
                            id_producto: Number(item.id_producto),
                            cantidad: item.cantidad,
                        })),
                    });
                    const salidaCompleta = await tx.salida.findUnique({
                        where: {
                            id_salida: nuevaSalida.id_salida,
                        },
                        include: {
                            Detalle_Salida: true
                        },
                    });
                    return salidaCompleta;
                });
                return salida;
                

            }catch (error){
                if(error.message.includes("Stock insuficiente")){
                    throw new Error("Stock insuficiente para realizar la salida.");
                }
                console.error("Error al crear la Salida", error);
                throw new Error("No se puede registrar la salida")
            }
        },
    },   
};

export default salidasResolver;