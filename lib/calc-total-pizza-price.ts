import { Ingredient, ProductItem } from '@prisma/client';
import {PizzaSize, PizzaType} from "@/components/shared/constants";



/**
 * Функция для подсчета общей стоимости пиццы
 *
 * @example
 * ```
 * calcTotalPizzaPrice(1, 20, variants, ingredients, selectedIngredients);
 * ```
 *
 * @param type - тип теста выбранной пиццы
 * @param size - размер выбранной пиццы
 * @param variants - список вариаций
 * @param ingredients - список ингредиентов
 * @param selectedIngredients - список выбранных ингредиентов
 *
 * @returns number общая стоимость
 */
export const calcTotalPizzaPrice = (
    type: PizzaType,
    size: PizzaSize,
    variants: ProductItem[],
    ingredients: Ingredient[],
    selectedIngredients: Set<number>
) => {
    const pizzaPrice =
        variants.find(
            variant => variant.pizzaType === type && variant.size === size
        )?.price || 0;

    const totalIngredientsPrice = ingredients
        .filter(ingredient => selectedIngredients.has(ingredient.id))
        .reduce((acc, ingredient) => acc + ingredient.price, 0);

    return pizzaPrice + totalIngredientsPrice;
};