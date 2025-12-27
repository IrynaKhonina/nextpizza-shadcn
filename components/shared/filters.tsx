'use client';

import React from 'react';

import { Title } from '.';
import {Input, RangeSlider} from '../ui';



import {useIngredients} from "@/hooks/use-ingredients";
import {useFilters} from "@/hooks/use-filters";
import {useQueryFilters} from "@/hooks/use-query-filters";
import {CheckboxFiltersGroup} from "@/components/shared/checkbox-filters-group";

interface Props {
    className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
    const { ingredients} = useIngredients();
    const filters = useFilters();

    useQueryFilters(filters);

    const items = ingredients.map(item => ({
        value: String(item.id),
        text: item.name
    }));

    const updatePrices = (prices: number[]) => {
        filters.setPrices('priceFrom', prices[0]);
        filters.setPrices('priceTo', prices[1]);
    };

    return (
        <div className={className}>
            <Title
                text='Фильтрация'
                size='sm'
                className='mb-5 font-bold'
            />

            {/* TOP CHECKBOXES */}
            <CheckboxFiltersGroup
                name='pizzaTypes'
                title='Тип теста'
                className='mb-4'
                selectedValues={filters.pizzaTypes}
                onClickCheckbox={filters.setPizzaTypes}
                items={[
                    { text: 'Тонкое', value: '1' },
                    { text: 'Традиционное', value: '2' }
                ]}
            />
            <CheckboxFiltersGroup
                name='sizes'
                title='Размеры'
                className='mb-4'
                selectedValues={filters.sizes}
                onClickCheckbox={filters.setSizes}
                items={[
                    { text: '20 см', value: '20' },
                    { text: '30 см', value: '30' },
                    { text: '40 см', value: '40' }
                ]}
            />

            {/* PRICE SETTINGS */}
            <div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
                <p className='mb-3 font-bold'>Цена от и до:</p>
                <div className='mb-5 flex gap-3'>
                    <Input
                        type='number'
                        placeholder='0'
                        min={0}
                        max={1000}
                        value={String(filters.prices.priceFrom)}
                        onChange={e =>
                            filters.setPrices('priceFrom', Number(e.target.value))
                        }
                    />
                    <Input
                        type='number'
                        placeholder='1000'
                        min={100}
                        max={1000}
                        value={String(filters.prices.priceTo)}
                        onChange={e => filters.setPrices('priceTo', Number(e.target.value))}
                    />
                </div>

                <RangeSlider
                    min={0}
                    max={1000}
                    step={10}
                    value={[
                        filters.prices.priceFrom || 0,
                        filters.prices.priceTo || 1000
                    ]}
                    onValueChange={updatePrices}
                />
            </div>

            {/* INGRIDIENTS FILTER */}
            <CheckboxFiltersGroup
                className='mt-5'
                title='Ингредиенты:'
                name='ingredients'
                limit={6}
                defaultItems={items.slice(0, 6)}
                items={items}
                onClickCheckbox={filters.setSelectedIngredients}
                selectedValues={filters.selectedIngredients}
            />
        </div>
    );
};