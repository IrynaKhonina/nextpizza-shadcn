// Загружаем переменные окружения из .env файла
require('dotenv').config();

const { PrismaClient } = require('@prisma/client');

// Проверим, что переменная загружена
console.log('PRISMA_DATABASE_URL exists:', !!process.env.PRISMA_DATABASE_URL);
if (!process.env.PRISMA_DATABASE_URL) {
  console.error('❌ PRISMA_DATABASE_URL not found in .env file!');
  process.exit(1);
}

// Для Prisma 7 с Accelerate нужно указать accelerateUrl
const prisma = new PrismaClient({
  accelerateUrl: process.env.PRISMA_DATABASE_URL,
  log: ['warn', 'error']
});

async function main() {
  console.log('🔍 Тестируем Prisma Client с Accelerate...');
  try {
    await prisma.$connect();
    console.log('✅ Подключение к базе успешно!');
    
    const count = await prisma.user.count();
    console.log(`📊 Пользователей в базе: ${count}`);
    
    if (count > 0) {
      const users = await prisma.user.findMany({
        select: { id: true, fullname: true, email: true, role: true }
      });
      console.log('👥 Данные пользователей:');
      console.log(JSON.stringify(users, null, 2));
    } else {
      console.log('⚠️  Таблица user пуста.');
    }
  } catch (error) {
    console.error('❌ Ошибка:');
    console.error('Сообщение:', error.message);
    if (error.code) console.error('Код ошибки:', error.code);
    if (error.meta) console.error('Метаданные:', JSON.stringify(error.meta, null, 2));
  } finally {
    await prisma.$disconnect();
    console.log('🔌 Соединение закрыто.');
  }
}

main();
