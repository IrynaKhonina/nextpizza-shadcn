'use client';

import React from 'react';
import {cn} from "@/lib/utils";



export type Variant = {
    name: string;
    value: string;
    disabled?: boolean;
};

interface Props {
    items: readonly Variant[];
    defaultValue?: string;
    onClick?: (value: Variant['value']) => void;
    value?: string;
    className?: string;
}

export const GroupVariants: React.FC<Props> = ({
                                                   items,
                                                   defaultValue,
                                                   onClick,
                                                   value,
                                                   className
                                               }) => {
    return (
        <div
            className={cn(
                'flex select-none justify-between rounded-3xl bg-[#f3f3f7] p-1',
                className
            )}
        >
            {items.map(item => (
                <button
                    key={item.value}
                    onClick={() => onClick?.(item.value)}
                    className={cn(
                        'flex h-[30px] flex-1 cursor-pointer items-center justify-center rounded-3xl px-5 text-sm transition-all duration-300',
                        {
                            'bg-white shadow': item.value === value,
                            'pointer-events-none text-gray-500 opacity-50': item.disabled
                        }
                    )}
                >
                    {item.name}
                </button>
            ))}
        </div>
    );
};