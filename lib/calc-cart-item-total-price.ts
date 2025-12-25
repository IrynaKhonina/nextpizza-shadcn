import {CartItemDTO} from "@/services/dto/cart.dto";


/**
 * Функция для подсчета общей стоимости пиццы
 * @example
 * ```
 * calcCartItemTotalPrice(item);
 * ```
 *
 * @param item - элемент корзины
 * @returns number общая стоимость (пиццы + ингредиенты) * количество
 */
export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
    const ingredientsPrice = item.ingredients.reduce(
        (acc, ingredient) => acc + ingredient.price,
        0
    );

    return (ingredientsPrice + item.productItem.price) * item.quantity;
};