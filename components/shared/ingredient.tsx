import { CircleCheck } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import {cn} from "@/lib/utils";



interface Props {
    imageUrl: string;
    name: string;
    price: number;
    isActive?: boolean;
    onClick?: () => void;
    className?: string;
}

export const Ingredient: React.FC<Props> = ({
                                                imageUrl,
                                                name,
                                                price,
                                                isActive,
                                                onClick,
                                                className
                                            }) => {
    return (
        <div
            className={cn(
                'relative flex w-32 cursor-pointer flex-col items-center rounded-md bg-white p-1 text-center shadow-md outline-none transition-all duration-300 ease-out',
                {
                    'outline outline-2 outline-primary': isActive
                },
                className
            )}
            onClick={onClick}
        >
            <CircleCheck
                className={cn(
                    'absolute right-2 top-2 z-10 text-primary opacity-0 transition-opacity duration-300 ease-out',
                    {
                        'opacity-100': isActive
                    }
                )}
            />

            <div className='relative h-20 w-20'>
                <Image
                    fill
                    sizes='100%'
                    src={imageUrl}
                    alt={name}
                    className='rounded'
                />
            </div>
            <span className='mb-1 text-xs'>{name}</span>
            <span className='font-bold'>{price} ₽</span>
        </div>
    );
};