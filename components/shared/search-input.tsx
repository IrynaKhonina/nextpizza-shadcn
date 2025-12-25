'use client';

import { Product } from '@prisma/client';
import { Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { useClickAway, useDebounce } from 'react-use';
import {cn} from "@/lib/utils";
import {Api} from "@/services/api-client";

interface Props {
    className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const ref = useRef(null);

    useClickAway(ref, () => {
        setIsFocused(false);
    });

    useDebounce(
        async () => {
            try {
                const response = await Api.products.search(searchQuery);
                setProducts(response);
            } catch (err) {
                console.error(err);
            }
        },
        100,
        [searchQuery]
    );

    const onClickItem = () => {
        setIsFocused(false);
        setSearchQuery('');
        setProducts([]);
    };

    return (
        <>
            {isFocused && (
                <div className='fixed bottom-0 left-0 right-0 top-0 z-30 bg-black/50' />
            )}

            <div
                className={cn(
                    'relative z-30 flex h-11 flex-1 justify-between rounded-2xl',
                    className
                )}
                ref={ref}
            >
                <Search className='absolute left-3 top-1/2 h-5 translate-y-[-50%] text-gray-400' />
                <input
                    className='w-full rounded-2xl bg-gray-50 pl-11 outline-none'
                    type='text'
                    placeholder='Поиск...'
                    onFocus={() => setIsFocused(true)}
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />

                {products.length > 0 && (
                    <div
                        className={cn(
                            'invisible absolute z-30 w-full rounded-xl bg-white py-2 opacity-0 shadow-md transition-all duration-200',
                            isFocused && 'visible top-12 opacity-100'
                        )}
                    >

                        {products.map(product => (
                            <Link
                                key={product.id}
                                href={`/product/${product.id}`}
                                className='flex w-full items-center gap-3 px-3 py-2 hover:bg-primary/10'
                                onClick={onClickItem}
                            >
                                <Image
                                    className='rounded-sm'
                                    src={product.imageUrl}
                                    alt='pizza'
                                    width={32}
                                    height={32}
                                />
                                <span>{product.name}</span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};