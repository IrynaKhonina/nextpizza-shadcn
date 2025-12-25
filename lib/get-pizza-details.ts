import { Ingredient, ProductItem } from '@prisma/client';
import { calcTotalPizzaPrice } from './calc-total-pizza-price';
import {mapPizzaType, PizzaSize, PizzaType} from "@/constants";

/**
 * Функция для получения деталей пиццы
 *
 * @example
 * ```
 * getPizzaDetails(1, 20, variants, ingredients, selectedIngredients);
 * ```
 *
 * @param type - тип теста выбранной пиццы
 * @param size - размер выбранной пиццы
 * @param variants - список вариаций
 * @param ingredients - список ингредиентов
 * @param selectedIngredients - список выбранных ингредиентов
 * @returns object { totalPrice: number, textDetails: string }
 */
export const getPizzaDetails = (
    type: PizzaType,
    size: PizzaSize,
    variants: ProductItem[],
    ingredients: Ingredient[],
    selectedIngredients: Set<number>
) => {
    const totalPrice = calcTotalPizzaPrice(
        type,
        size,
        variants,
        ingredients,
        selectedIngredients
    );
    const textDetails = `${size} см, ${mapPizzaType[type].toLowerCase()} тесто ${size}`;

    return {
        totalPrice,
        textDetails
    };
};