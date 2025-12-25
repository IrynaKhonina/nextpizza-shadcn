import Image from 'next/image';
import React from 'react';
import { Title } from '.';
import { Button } from '../ui';
import {cn} from "@/lib/utils";



interface Props {
    imageUrl: string;
    name: string;
    price: number;
    loading?: boolean;
    onSubmit: VoidFunction;
    className?: string;
}

/**
 * Choose PRODUCT Form
 */
export const ChooseProductForm: React.FC<Props> = ({
                                                       imageUrl,
                                                       name,
                                                       price,
                                                       loading,
                                                       onSubmit,
                                                       className
                                                   }) => {
    return (
        <div className={cn('flex flex-1', className)}>
            <div className='relative flex w-full flex-1 items-center justify-center'>
                <div className='relative left-2 top-2 z-10 h-[350px] w-[350px] transition-all duration-300'>
                    <Image
                        src={imageUrl}
                        alt={name}
                        fill
                        sizes='100%'
                    />
                </div>
            </div>

            <div className='w-[490px] bg-[#f7f7f7] p-7'>
                <Title
                    text={name}
                    className='mb-1 font-extrabold'
                />

                <Button
                    // loading={loading}
                    onClick={() => onSubmit()}
                    className='mt-10 h-[55px] w-full rounded-[18px] px-10 text-base'
                >
                    Добавить в корзину за {price} ₽
                </Button>
            </div>
        </div>
    );
};