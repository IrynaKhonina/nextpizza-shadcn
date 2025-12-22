// prisma/seed.ts - ИСПРАВЛЕННЫЙ ВАРИАНТ
import 'dotenv/config'
import { prisma } from '@/lib/prisma'
import { hashSync } from 'bcrypt'
import {categories, ingredients, products} from "@/prisma/constants";



async function main() {
    console.log('🚀 Запуск seed...')

    try {
        // Удаляем существующих пользователей через deleteMany (безопаснее чем TRUNCATE)
        await prisma.user.deleteMany({})
        console.log('🧹 Существующие пользователи удалены')

        // Создание пользователей
        const user1 = await prisma.user.create({
            data: {
                fullname: 'User',
                email: 'test@user.ru',
                password: hashSync('111111', 10),
                verified: new Date(),
                role: 'USER',
            }
        })

        const user2 = await prisma.user.create({
            data: {
                fullname: 'Admin',
                email: 'admintest@user.ru',
                password: hashSync('111111', 10),
                verified: new Date(),
                role: 'ADMIN',
            }
        })

        console.log('✅ Seed выполнен успешно!')
        console.log('Созданы пользователи:')
        console.log(`1. ${user1.fullname} - ${user1.email} (ID: ${user1.id})`)
        console.log(`2. ${user2.fullname} - ${user2.email} (ID: ${user2.id})`)


        await prisma.category.createMany({
            data: categories
        });

        await prisma.ingredient.createMany({
            data: ingredients
        });

        await prisma.product.createMany({
            data: products
        });

    } catch (error) {
        console.error('❌ Ошибка seed:', error)
        throw error
    }
}

// Экспортируем main для Prisma
export { main }

// Запускаем только если файл выполняется напрямую
if (require.main === module) {
    main()
        .catch((e) => {
            console.error(e)
            process.exit(1)
        })
        .finally(async () => {
            await prisma.$disconnect()
        })
}