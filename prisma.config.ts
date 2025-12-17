// prisma.config.ts
import 'dotenv/config'
import { defineConfig, env } from 'prisma/config'

export default defineConfig({
    schema: 'prisma/schema.prisma',      // Путь к схеме
    migrations: {
        path: 'prisma/migrations',         // Папка для миграций
    },
    datasource: {
        url: env('DATABASE_URL'),           // URL берется из переменной окружения
    },
})