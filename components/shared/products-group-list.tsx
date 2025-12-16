'use client';

import React, {useEffect, useRef, useState} from 'react';
import { Title } from './title';
import { ProductCard } from './product-card';
import {cn} from "@/lib/utils";

interface Props {
    title: string;
    items: [];
    categoryId?: number;
    className?: string;
    listClassName?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
                                                       title,
                                                       items,
                                                       className,
                                                       categoryId,
                                                       listClassName
                                                   }) => {
    const intersectionRef = useRef<HTMLDivElement>(null);
    const [isIntersecting, setIsIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting);
            },
            { threshold: 0.4 }
        );

        const currentRef = intersectionRef.current;

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    useEffect(() => {
        if (isIntersecting) {
            console.log(title, categoryId);
        }
    }, [categoryId, isIntersecting, title]);

    return (
        <div
            className={className}
            id={title}
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
                        price={product.items[0].price}
                    />
                ))}
            </div>
        </div>
    );
};