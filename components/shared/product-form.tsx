'use client';

import React from 'react';
import toast from 'react-hot-toast';
import { ChoosePizzaForm } from './choose-pizza-form';
import { ChooseProductForm } from './choose-product-form';
import { ProductWithRelations } from '@/@types/prisma';
import {useCartStore} from "@/store/cart";

interface Props {
    product: ProductWithRelations;
    _onSubmit?: VoidFunction;
}

export const ProductForm: React.FC<Props> = ({ product, _onSubmit }) => {
    const [loading, addCartItem] = useCartStore(state => [
        state.loading,
        state.addCartItem
    ]);
    const firstItem = product.variants[0];
    const isPizzaForm = Boolean(firstItem.pizzaType);

    const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
        try {
            const itemId = productItemId ?? firstItem.id;

            await addCartItem({
                productItemId: itemId,
                ingredients
            });

            toast.success(`Добавлено: ${product.name}`);

            _onSubmit?.();
        } catch (error) {
            console.error(error);
            toast.error(`Не удалось добавить ${product.name}`);
        }
    };

    if (isPizzaForm) {
        return (
            <ChoosePizzaForm
                imageUrl={product.imageUrl}
                name={product.name}
                ingredients={product.ingredients}
                variants={product.variants}
                onSubmit={onSubmit}
                loading={loading}
            />
        );
    }

    return (
        <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            onSubmit={onSubmit}
            price={firstItem.price}
            loading={loading}
        />
    );
};