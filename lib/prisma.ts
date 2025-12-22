// lib/prisma.ts - ИСПРАВЛЕННЫЙ ВАРИАНТ (для Accelerate)
import { PrismaClient } from '@prisma/client'

// 1. Паттерн синглтона для предотвращения множественных соединений в dev-режиме
const prismaClientSingleton = () => {
    return new PrismaClient({
        // ТОЛЬКО accelerateUrl для Prisma Data Platform
        accelerateUrl: process.env.PRISMA_DATABASE_URL
        // НЕТ adapter здесь!
    })
}

declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;