import prisma from "../../config/prisma/prismaClient.js";
//import prisma from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const authResolver = {
    Mutation: {
        login: async (_, {usuario, password}, { req }) => {
            
            const user = await prisma.usuario.findUnique({
                where: { usuario },
                include: { 
                    Rol:{
                        // include:{
                        //     permisos: true,
                        // },
                    },
                },
            });

            
            if(!user || user.estado!=="Activo"){
                throw new Error("Credenciales Invalidas");
            }

            const passwordValido = await bcrypt.compare(
                password,
                user.password_hash
            );

            
            
            if(!passwordValido){
                throw new Error("Crdenciales Invalidas");
            }
            
            //const deviceId = req?.headers["x-device-id"] || "unknown-device";

            const  token = jwt.sign(
                {
                     sub: user.id_usuario,
                     username: user.usuario,
                     role: user.Rol.nombre,
                     
                },
                process.env.JWT_SECRET,
                { 
                    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
                    // issuer: "crm-api",
                    // audience: "crm-client",
                }
            );

            return {
                token,
                usuario: {
                    id: user.id_usuario,
                    usuario: user.usuario,
                    nombre: user.nombre,
                    estado: user.estado,
                    rol: user.Rol
                    ?{
                        nombre: user.Rol.nombre,
                    }
                    :null
                },
            };
        },
    },
};

export default authResolver;