import { Ingredient } from '@prisma/client';
import { useEffect, useState } from 'react';
import {Api} from "@/services/api-client";



export function useIngredients() {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [isloading, setIsloading] = useState(true);

    useEffect(() => {
        async function getIngredients() {
            try {
                setIsloading(true);
                const ingredients = await Api.ingredients.getAll();
                setIngredients(ingredients);
            } catch (err) {
                console.error(err);
            } finally {
                setIsloading(false);
            }
        }

        getIngredients();
    }, []);

    return {
        ingredients,
        isloading
    };
}