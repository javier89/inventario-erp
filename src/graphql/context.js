import prisma from "../config/prismaClient.js";
import jwt  from 'jsonwebtoken';

export const context = async ({req})=>{
    const auth= req.headers.authorization || "";
    const token = auth.replace("Bearer ", "")

    let user =  null;
    try{
        if(token){
            user =jwt.verify(token, "SECRET");
        }
    } catch(error){
        user=null;
    }

    return {
        prisma,
        user: null,
    };
};
