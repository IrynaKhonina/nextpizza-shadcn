'use client';

import React, { useEffect, useRef } from 'react';
import { useIntersection } from 'react-use';

import { ProductCard } from './product-card';
import { Title } from './title';

import { ProductWithRelations } from '@/@types/prisma';

import {useCategoryStore} from "@/store/category";
import {cn} from "@/lib/utils";

interface Props {
    title: string;
    items: ProductWithRelations[];
    listClassName?: string;
    categoryId: number;
    className?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
                                                       title,
                                                       items,
                                                       listClassName,
                                                       categoryId,
                                                       className
                                                   }) => {
    const setActiveCategoryId = useCategoryStore(state => state.setActiveId);
    const intersectionRef = useRef<HTMLDivElement | null>(null);

    const intersection = useIntersection(
        intersectionRef as React.RefObject<HTMLElement>,
        { threshold: 0.4 }
    );

    useEffect(() => {
        if (intersection?.isIntersecting) {
            setActiveCategoryId(categoryId);
        }
    }, [categoryId, intersection?.isIntersecting, title]);

    return (
        <div
            className={cn(className)}
            id={`category-${categoryId}`}
            ref={intersectionRef}
        >
            <Title
                text={title}
                size='lg'
                className='mb-5 font-extrabold'
            />

            <div
                className={cn(
                    'grid grid-cols-1 gap-[50px] md:grid-cols-2 lg:grid-cols-3',
                    listClassName
                )}
            >
                {items.map(product => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        imageUrl={product.imageUrl}
                        price={product.variants[0].price}
                        ingredients={product.ingredients}
                    />
                ))}
            </div>
        </div>
    );
};