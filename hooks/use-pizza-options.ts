import { ProductItem } from '@prisma/client';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useSet } from 'react-use';


import {Variant} from "@/components/shared/group-variants";
import {PizzaSize, PizzaType} from "@/components/shared/constants";
import {getAvailablePizzaSizes} from "@/lib/get-available-pizza-sizes";

interface ReturnProps {
    size: PizzaSize;
    type: PizzaType;
    setSize: (size: PizzaSize) => void;
    setType: (type: PizzaType) => void;
    availableSizes: Variant[];
    currentItemId?: number;
    addIngredient: (id: number) => void;
    selectedIngredients: Set<number>;
}

export function usePizzaOptions(variants: ProductItem[]): ReturnProps {
    const [size, setSize] = useState<PizzaSize>(20);
    const [type, setType] = useState<PizzaType>(1);
    const [selectedIngredients, { toggle: addIngredient }] = useSet(
        new Set<number>([])
    );

    const availableSizes = getAvailablePizzaSizes(type, variants);

    const currentItemId = variants.find(
        variant => variant.pizzaType === type && variant.size === size
    )?.id;

    useEffect(() => {
        const isAvailableSize = availableSizes?.find(
            item => Number(item.value) === size && !item.disabled
        );
        const availableSize = availableSizes?.find(item => !item.disabled);

        if (!isAvailableSize && availableSize) {
            setSize(Number(availableSize.value) as PizzaSize);
        }
    }, [type]);

    return {
        size,
        type,
        setSize,
        setType,
        availableSizes,
        currentItemId,
        addIngredient,
        selectedIngredients
    };
}