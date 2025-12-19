import {prisma} from "@/lib/prisma";
import {hashSync} from "bcrypt";

async function up() {
    await prisma.user.createMany({
        data:[
            {
                fullname: 'User',
                email: 'test@user.ru',
                password: hashSync('111111',10),
                verified: new Date(),
                role: 'USER',
            },
            {
                fullname: 'Admin',
                email: 'admintest@user.ru',
                password: hashSync('111111',10),
                verified: new Date(),
                role: 'ADMIN',
            },

        ]
    })

}

async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`;

}

async function main() {
    try {
        await down();
        await up();
    } catch (e) {
        console.log(e);
    }
}

