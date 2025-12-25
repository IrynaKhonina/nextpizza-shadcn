import { Ingredient } from '@prisma/client';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Title } from '.';
import { Button } from '../ui';
import {cn} from "@/lib/utils";



interface Props {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    ingredients: Ingredient[];
    className?: string;
}

export const ProductCard: React.FC<Props> = ({
                                                 id,
                                                 name,
                                                 price,
                                                 imageUrl,
                                                 ingredients,
                                                 className
                                             }) => {
    return (
        <div className={cn(className)}>
            <Link href={`/product/${id}`}>
                <div
                    className='relative top-0 flex justify-center rounded-lg p-6 transition-all duration-200 ease-out hover:top-[3px]'
                    title={name}
                >
                    <div className={cn('relative h-60 w-60')}>
                        <Image
                            fill
                            sizes='100%'
                            src={imageUrl}
                            alt={name}
                            priority
                        />
                    </div>
                </div>

                <Title
                    text={name}
                    className='mb-1 mt-3 font-bold'
                    size='sm'
                />

                <p className='text-sm text-gray-400'>
                    {ingredients.map(ingredient => ingredient.name).join(', ')}
                </p>

                <div className='mt-4 flex items-center justify-between'>
					<span className='text-[20px]'>
						от <b>{price} ₽</b>
					</span>

                    <Button
                        variant='secondary'
                        className='text-base font-bold'
                    >
                        <Plus
                            className='mr-1'
                            size={20}
                        />
                    </Button>
                </div>
            </Link>
        </div>
    );
};