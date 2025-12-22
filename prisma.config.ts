// prisma.config.ts
import 'dotenv/config'
import { defineConfig, env } from "prisma/config";



export default defineConfig({
    schema: "prisma/schema.prisma",
    migrations: {
        path: "prisma/migrations",
        seed: 'tsx prisma/seed.ts',
    },
    datasource: {
        // Используйте переменную окружения с вашим специальным URL

        url: env("DATABASE_URL") // Он начинается с prisma+postgres://[citation:3]
    }
});