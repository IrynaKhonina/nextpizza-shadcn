import { Ingredient, Product, ProductItem } from '@prisma/client';

export type ProductWithRelations = Product & {
    variants: ProductItem[];
    ingredients: Ingredient[];
};