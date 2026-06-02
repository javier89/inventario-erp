import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login=async (username, password)=>{
    const user = await prisma.usuario.findUnique({
        where: { username},
        include:{
            roles:{
                include:{rol:true}
            }
        }
    });

    if(!user) return null;

    const match = await bcrypt.compare(password, user.password_hash);
    if(!match) return null;

    const token = jwt.sign(
        {
            id:user.usuario_id,
            username: user.username,
            roles: user.roles.map(r=>r.rol.nombre),
        },
        process.env.JTW_SECRET,
        {expiresIn:"8h"}
    );
    return { token };
};

