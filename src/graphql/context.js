import prisma from "../config/prisma/prismaClient.js";

export const context = async ({req})=>{
    return{
        prisma,
        user: null,
    };
};
