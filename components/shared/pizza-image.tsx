import Image from 'next/image';
import React from 'react';
import {cn} from "@/lib/utils";



interface Props {
    src: string;
    alt: string;
    size: 20 | 30 | 40;
    className?: string;
}

export const PizzaImage: React.FC<Props> = ({ src, alt, size, className }) => {
    return (
        <div
            className={cn(
                'relative flex w-full flex-1 items-center justify-center',
                className
            )}
        >
            <div
                className={cn(
                    'relative left-2 top-2 z-10 transition-all duration-300',
                    {
                        'h-[300px] w-[300px]': size === 20,
                        'h-[400px] w-[400px]': size === 30,
                        'h-[500px] w-[500px]': size === 40
                    }
                )}
            >
                <Image
                    fill
                    sizes='100%'
                    src={src}
                    alt={alt}
                />
            </div>

            <div className='absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-gray-200' />
            <div className='absolute left-1/2 top-1/2 h-[370px] w-[370px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-gray-200' />
        </div>
    );
};