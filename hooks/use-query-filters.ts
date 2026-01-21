import { useRouter } from 'next/navigation';
import qs from 'qs';
import { useEffect, useRef } from 'react';

import { Filters } from './use-filters';

export function useQueryFilters(filters: Filters) {
    const router = useRouter();
    const isMounted = useRef(false);

    useEffect(() => {
        if (isMounted.current) {
            const params = {
                ...filters.prices,
                pizzaTypes: Array.from(filters.pizzaTypes),
                sizes: Array.from(filters.sizes),
                ingredients: Array.from(filters.selectedIngredients)
            };

            const query = qs.stringify(params, {
                arrayFormat: 'comma'
            });

            router.push(`?${query}`, { scroll: false });
        }

        isMounted.current = true;
    }, [filters, router]);

    return {};
}