import { ProductItem } from '@prisma/client';



import {Variant} from "@/components/shared/group-variants";
import {pizzaSizes, PizzaType} from "@/components/shared/constants";

/**
 * Функция для получения доступных размеров пиццы
 *
 * @example
 * ```
 * getAvailablePizzaSizes(1, variants);
 * ```
 *
 * @param type - тип пиццы
 * @param variants - список вариаций
 * @returns Variant[] список доступных размеров
 */
export const getAvailablePizzaSizes = (
    type: PizzaType,
    variants: ProductItem[]
): Variant[] => {
    const filteredPizzasByType = variants.filter(
        variant => variant.pizzaType === type
    );

    return pizzaSizes.map(item => ({
        name: item.name,
        value: item.value,
        disabled: !filteredPizzasByType.some(
            pizza => Number(pizza.size) === Number(item.value)
        )
    }));
};