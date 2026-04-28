import { GraphQLError } from 'graphql';
//import prisma from '../../config/prisma/prismaClient.js';

const resolvers ={
    
    Query:{
        productos: async(_, { page, pageSize, filters, orderBy }, { prisma}) => {
                
            const skip = (page-1) * pageSize;
            const take = Math.min(pageSize, 50);

            const {
                search,
                nombre,
                sku,
                stockMin,
                stockMax,
                precioMin,
                precioMax,
                activo= true,
            } = filters || {};

            const searchCondition = search ?{
                OR: [
                     {nombre: {contains: search, mode:"insensitive"}},
                     {sku:{contains: search, mode:"insensitive"}},
                ],
            }
            : {};

            const where = {
                activo,
                ...searchCondition,
                ...(nombre && {
                    nombre: {contains: nombre, mode:"insensitive"},
                }),
                ...(sku && { sku }),
                ...((stockMin !== undefined || stockMax !== undefined) && {
                    stock:{
                        ...(stockMin !== underfined && {gte: stockMin}),
                        ...(stockMax !== underfined && {lte: stockMax}),
                    },
                }),
            };

            const include = {
                HistorialPrecio:{
                    orderBy:{ fecha:"desc"},
                    take: 1,
                },
            };

            let prismaOrderBy={id_producto:"desc"};
            if(orderBy && orderBy.field !== "precio"){
                prismaOrderBy ={
                    [orderBy.field]: orderBy.direction || "desc",
                };
            }

            const[productos, total]=await Promise.all([
                prisma.productos.findMany({
                    where,
                    include,
                    skip,
                    take,
                    orderBy: prismaOrderBy,
                }),
                prisma.productos.count({ where }),
            ]);

            let data = productos.map(p => ({
                ...p,
                precio_actual: p.HistorialPrecio[0]?.precio || null,
            }));

            if(precioMin !== undefined || precioMax !== undefined){
                data = data.filter( p => {
                    if(p.precio_actual === null) return false;
                    return (
                        (precioMin === undefined || p.precio_actual >= precioMin) &&
                        (precioMax === undefined || p.precio_actual <= precioMax)
                    );
                });
            }

            if(orderBy?.field === "precio"){
                data.sort((a, b)=>{
                    const dir = orderBy.direction === "asc"?1:-1;
                    return (a.precio_actual - b.precio_actual)*dir;
                });
            }
            return{
                data,
                total,
                page,
                pageSize,
                totalPage: Math.ceil(total/pageSize),
            };
            
        },

        // Metoso Para un solo Producto
        producto: async(_, {id_producto},{prisma}) => {
            if(!id_producto){
                throw new  GraphQLError("El producto es obligatorio")
            }
            const producto= await prisma.productos.findFirst({
                where:{
                    id_producto: Number(id_producto),
                    activo: true
                },
            });
            if(!producto){
                throw new GraphQLError("Producto no Encontrado o Inactivo");
            }
            return producto;
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
            if(!sku){
                throw new GraphQLError("El SKU es Obligatorio");
            }
            // const { sku: _, ...dataSinSku } = data;

            const { sku: skuIgnorado, ...dataSinSku } = data;
            
            return prisma.productos.update({
                where: { sku },
                data: dataSinSku,
            });
        },

        //Revisar esto antes en 1 min
        actualizarProductoPorSku: async (_,{sku,data},{prisma, user}) =>{
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
        
        eliminarProducto: async(_, {id_producto}, {prisma})=>
        {
            const productos = await prisma.productos.findUnique({
                where:{id_producto: Number(id_producto)},
            });

            if(!id_producto){
                throw new  Error("Seleccionar el Producto es Obligatorio");
            }

            await prisma.productos.update({
                where: {id_producto: Number(id_producto) },
                data: {activo: false},
            });
            return true;
        },
    },
};

//console.log(Object.keys(prisma));

export default resolvers;