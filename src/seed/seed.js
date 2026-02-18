import pkg from "@prisma/client";
import bcrypt from "bcryptjs";

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

async function main(){
    console.log("🌱 Ejecutando el Seed");

    // Crea el Rol Admin si no existe
    const adminRol = await prisma.rol.upsert({
        where: { nombre: "Admin" },
        update: { },
        create: { nombre: "Admin",
            descriptcion: 'Rol Administrador del Sistema',
        },
    });

    // Crea usuario admin si no existe
    const adminUser = "admin";

    const adminExiste = await prisma.usuario.findUnique({
        where: { usuario: adminUser },
    });

    if(!adminExiste){
        const passwordHash = await bcrypt.hash("admin123", 10);

        await prisma.usuario.create({
            data:{
                nombre: "Administrador",
                usuario: adminUser,
                password_hash: passwordHash,
                estado: "Activo",
                Rol: {
                    connect: {id_rol: 1,}
                },
            },
        });

        console.log("✅ Usuario Admin Creado");
    } else {
        console.log("ℹ️ Usuario Admin ya existe");
    }
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});