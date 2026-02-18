import { GraphQLError } from 'graphql';
import prisma from '../../config/prisma/prismaClient.js';

const resolvers ={
    
    Query:{
        productos: async()=>{
            return prisma.productos.findMany();
        },

        producto: async(_, {id_producto}) =>{
            return prisma.productos.findUnique({
                where: {id_producto: Number(id_producto)},
            });
        },
    },

    Mutation:{
        crearProducto: async(_, { data})=>{
            try{
                const producto = await prisma.productos.create({
                    data: {
                        nombre: data.nombre,
                        sku: data.sku,
                        stock: data.stock ?? 0,
                        codigo_barras: data.codigo_barras ?? null,
                        unidad_medida: data.unidad_medida ?? null,
                        ubicacion: data.ubicacion ?? null,

                        historialPrecio:{
                        create: {
                            precio_producto: data.precio,
                            // fecha: new Date(),
                        },
                        },
                    },

                    include: {
                        HistorialPrecio: true,
                    }
                });
                return {
                    ok: true,
                    message: "Producto creado correctamente",
                    producto,
                };
            }
            catch(error){
                // SKU duplicado
                if(error.code === "P2002"){
                    throw new GraphQLError(
                        `Ya existe un producto con el SKU "${data.sku}"`,
                        {
                            extensions: {
                                code: "BAD_USER_INPUT",
                            },
                        }
                    );
                }
                throw new GraphQLError("Error al crear el producto",{
                    extensions:{
                        code: "INTERNAL_SERVER_ERROR",
                    },
                });
            }
        },
        actualizarProducto: async ( _, {sku, data }) =>{
            const { sku: skuIgnorado, ...dataSinSku} = data
            
            return prisma.productos.update({
                where: {sku:sku},
                data: dataSinSku,
            });
        },

        actualizarProductoPorSku: async (_,{sku, data},{prisma}) =>{
            //Verificar si existe 
            const productoExistente = await prisma.productos.findUnique({
                where:{sku}
            });
            if(!productoExistente){
                throw new Error(`No Existe producto con SKU: ${sku}`);
            }
            //Actualizar 
            const productoActualizado = await prisma.productos.update({
                where:{sku},
                data
            });
            return productoActualizado;
        },
        
        eliminarProducto:async(_, {id})=>
        {
            await prisma.productos.update({
                where: {id_producto:Number(id)},
                data: {activo: false},
            });
            return true;
        },
    },
};

console.log(Object.keys(prisma));

export default resolvers;