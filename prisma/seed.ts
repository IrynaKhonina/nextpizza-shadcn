
import 'dotenv/config'
import { prisma } from '@/lib/prisma'
import { hashSync } from 'bcrypt'
import { categories, ingredients, products } from "@/prisma/constants"

const randomDecimalNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10
}

const generateProductItem = ({
                                 productId,
                                 pizzaType,
                                 size
                             }: {
    productId: number
    pizzaType?: 1 | 2
    size?: 20 | 30 | 40
}) => {
    return {
        productId,
        price: randomDecimalNumber(190, 600),
        pizzaType,
        size
    }
}

async function main() {
    console.log('🚀 Запуск seed...')

    try {
        // ОЧИСТКА В ПРАВИЛЬНОМ ПОРЯДКЕ
        console.log('🧹 Очистка таблиц...')
        await prisma.storyItem.deleteMany({})
        await prisma.story.deleteMany({})
        await prisma.cartItem.deleteMany({})
        await prisma.cart.deleteMany({})
        await prisma.productItem.deleteMany({})
        await prisma.ingredient.deleteMany({})
        await prisma.product.deleteMany({})
        await prisma.category.deleteMany({})
        await prisma.user.deleteMany({})
        console.log('✅ Все таблицы очищены')

        // СОЗДАНИЕ КАТЕГОРИЙ И ПОЛУЧЕНИЕ ИХ ID
        console.log('🏷️ Создание категорий...')
        const createdCategories = []

        for (const category of categories) {
            const created = await prisma.category.create({
                data: { name: category.name }
            })
            createdCategories.push(created)
        }

        console.log(`✅ Категории созданы: ${createdCategories.length} шт`)

        // Создаем маппинг имя -> ID для категорий
        const categoryMap: Record<string, number> = {}
        createdCategories.forEach(cat => {
            categoryMap[cat.name] = cat.id
            console.log(`  - ${cat.name} (ID: ${cat.id})`)
        })

        // СОЗДАНИЕ ПОЛЬЗОВАТЕЛЕЙ
        console.log('👤 Создание пользователей...')
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
        console.log('✅ Пользователи созданы')

        // СОЗДАНИЕ ИНГРЕДИЕНТОВ
        console.log('🧀 Создание ингредиентов...')
        const createdIngredients = await prisma.ingredient.createMany({
            data: ingredients.map(ing => ({
                name: ing.name,
                price: ing.price,
                imageUrl: ing.imageUrl
            }))
        })
        console.log(`✅ Ингредиенты созданы: ${createdIngredients.count} шт`)

        // СОЗДАНИЕ ПРОДУКТОВ из constants с КОРРЕКТНЫМИ categoryId
        console.log('🍕 Создание продуктов из constants...')

        // Сопоставляем старые categoryId с новыми
        const categoryIdMapping: Record<number, number> = {
            1: categoryMap['Пиццы'] || 1,
            2: categoryMap['Завтрак'] || 2,
            3: categoryMap['Закуски'] || 3,
            4: categoryMap['Коктейли'] || 4,
            5: categoryMap['Напитки'] || 5
        }

        const productsToCreate = products.map(product => ({
            name: product.name,
            imageUrl: product.imageUrl,
            categoryId: categoryIdMapping[product.categoryId] || null
        }))

        await prisma.product.createMany({
            data: productsToCreate
        })
        console.log(`✅ Продукты созданы: ${products.length} шт`)

        // СОЗДАНИЕ 3 ОСНОВНЫХ ПИЦЦ
        console.log('🍕 Создание 3 основных пицц...')

        const pizzaCategoryId = categoryMap['Пиццы']

        const pizza1 = await prisma.product.create({
            data: {
                name: 'Пепперони фреш',
                imageUrl: 'https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp',
                categoryId: pizzaCategoryId,
            }
        })

        const pizza2 = await prisma.product.create({
            data: {
                name: 'Сырная',
                imageUrl: 'https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp',
                categoryId: pizzaCategoryId,
            }
        })

        const pizza3 = await prisma.product.create({
            data: {
                name: 'Чоризо фреш',
                imageUrl: 'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
                categoryId: pizzaCategoryId,
            }
        })

        console.log('✅ 3 основные пиццы созданы')

        // СОЗДАНИЕ ВАРИАНТОВ ПРОДУКТОВ для пицц
        console.log('📦 Создание вариантов для пицц...')
        await prisma.productItem.createMany({
            data: [
                // Пицца "Пепперони фреш"
                generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 20 }),
                generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 30 }),
                generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 40 }),

                // Пицца "Сырная"
                generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 20 }),
                generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 30 }),
                generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 40 }),
                generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 20 }),
                generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 30 }),
                generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 40 }),

                // Пицца "Чоризо фреш"
                generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 20 }),
                generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 30 }),
                generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 40 }),
            ]
        })
        console.log('✅ Варианты для пицц созданы')

        // ВАШ КОД - АДАПТИРОВАННЫЙ (без ошибок)
        console.log('🛒 Создание корзин...')
        await prisma.cart.createMany({
            data: [
                {
                    userId: user1.id,  // ← РЕАЛЬНЫЙ ID пользователя
                    totalAmount: 0,
                    token: 'cart-token-1'
                },
                {
                    userId: user2.id,  // ← РЕАЛЬНЫЙ ID пользователя
                    totalAmount: 0,
                    token: 'cart-token-2'
                }
            ]
        })
        console.log('✅ Корзины созданы')

        // ВАШ КОД - АДАПТИРОВАННЫЙ (без ошибок)
        console.log('🛍️ Создание элементов корзины...')

        // 1. Находим реальные данные
        const userCart = await prisma.cart.findFirst({
            where: { userId: user1.id }
        })

        // 2. Находим существующий ProductItem
        const existingProductItem = await prisma.productItem.findFirst({
            orderBy: { id: 'asc' }
        })

        // 3. Находим реальные ингредиенты
        const someIngredients = await prisma.ingredient.findMany({
            take: 5,
            orderBy: { id: 'asc' },
            select: { id: true }
        })

        if (userCart && existingProductItem && someIngredients.length > 0) {
            await prisma.cartItem.create({
                data: {
                    productItemId: existingProductItem.id, // ← РЕАЛЬНЫЙ ID
                    cartId: userCart.id, // ← РЕАЛЬНЫЙ ID
                    quantity: 2,
                    ingredients: {
                        connect: someIngredients.map(ing => ({ id: ing.id })) // ← РЕАЛЬНЫЕ ID
                    }
                }
            })
            console.log(`✅ CartItem создан с ${someIngredients.length} ингредиентами`)
        } else {
            console.log('⚠️ Не удалось создать CartItem')
        }


        console.log('📱 Создание сторис...')
        await prisma.story.createMany({
            data: [
                {
                    previewImageUrl: 'https://cdn.inappstory.ru/story/xep/xzh/zmc/cr4gcw0aselwvf628pbmj3j/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3101815496'
                },
                {
                    previewImageUrl: 'https://cdn.inappstory.ru/story/km2/9gf/jrn/sb7ls1yj9fe5bwvuwgym73e/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3074015640'
                },
                {
                    previewImageUrl: 'https://cdn.inappstory.ru/story/quw/acz/zf5/zu37vankpngyccqvgzbohj1/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=1336215020'
                },
                {
                    previewImageUrl: 'https://cdn.inappstory.ru/story/7oc/5nf/ipn/oznceu2ywv82tdlnpwriyrq/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=38903958'
                },
                {
                    previewImageUrl: 'https://cdn.inappstory.ru/story/q0t/flg/0ph/xt67uw7kgqe9bag7spwkkyw/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=2941222737'
                },
                {
                    previewImageUrl: 'https://cdn.inappstory.ru/story/lza/rsp/2gc/xrar8zdspl4saq4uajmso38/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=4207486284'
                }
            ]
        })
        console.log('✅ Сторисы созданы')


        console.log('📹 Создание элементов сторис...')
        await prisma.storyItem.createMany({
            data: [
                {
                    storyId: 1,
                    sourceUrl: 'https://cdn.inappstory.ru/file/dd/yj/sx/oqx9feuljibke3mknab7ilb35t.webp?k=IgAAAAAAAAAE'
                },
                {
                    storyId: 1,
                    sourceUrl: 'https://cdn.inappstory.ru/file/jv/sb/fh/io7c5zarojdm7eus0trn7czdet.webp?k=IgAAAAAAAAAE'
                },
                {
                    storyId: 1,
                    sourceUrl: 'https://cdn.inappstory.ru/file/ts/p9/vq/zktyxdxnjqbzufonxd8ffk44cb.webp?k=IgAAAAAAAAAE'
                },
                {
                    storyId: 1,
                    sourceUrl: 'https://cdn.inappstory.ru/file/ur/uq/le/9ufzwtpdjeekidqq04alfnxvu2.webp?k=IgAAAAAAAAAE'
                },
                {
                    storyId: 1,
                    sourceUrl: 'https://cdn.inappstory.ru/file/sy/vl/c7/uyqzmdojadcbw7o0a35ojxlcul.webp?k=IgAAAAAAAAAE'
                }
            ]
        })
        console.log('✅ Элементы сторис созданы')

        console.log('\n🎉 Seed полностью выполнен успешно!')
        console.log('━'.repeat(50))
        console.log('📊 Итого создано:')
        console.log(`   👥 Пользователей: 2`)
        console.log(`   🏷️  Категорий: ${createdCategories.length}`)
        console.log(`   🧀 Ингредиентов: ${ingredients.length}`)
        console.log(`   🍕 Продуктов: ${products.length + 3} (из constants + 3 пиццы)`)
        console.log(`   📦 Вариантов продуктов: 12`)
        console.log(`   🛒 Корзин: 2`)
        console.log(`   🛍️ Элементов корзины: 1`)
        console.log(`   📱 Сторисов: 6`)
        console.log(`   📹 Элементов сторис: 5`)
        console.log('━'.repeat(50))

    } catch (error) {
        console.error('❌ Ошибка seed:', error)
        throw error
    }
}

// Экспортируем main для Prisma
export { main }

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