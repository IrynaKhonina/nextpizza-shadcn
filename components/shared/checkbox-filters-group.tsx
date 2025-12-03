'use client';

import {FilterChecboxProps, FilterCheckbox} from "@/components/shared/filter-checkbox";
import {useState} from "react";
import {Input, Skeleton} from "@/components/ui";
import {cn} from "@/lib/utils";

type Item = FilterChecboxProps;

interface Props {
    title: string;
    items: Item[];
    defaultItems?: Item[];
    limit?: number;
    searchInputPlaceholder?: string;
    onClickCheckbox?: (id: string) => void;
    defaultValue?: string[];
    selectedValues?: Set<string>;
    isLoading?: boolean;
    className?: string;
    name?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
                                                          title,
                                                          items,
                                                          defaultItems,
                                                          limit = 5,
                                                          searchInputPlaceholder = 'Поиск...',
                                                          onClickCheckbox,
                                                          defaultValue,
                                                          selectedValues,
                                                          isLoading,
                                                          className,
                                                          name
                                                      }) => {
    const [showAll, setShowAll] = useState(false);
    const [seachValue, setSearchValue] = useState('');

    const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    if (isLoading) {
        return (
            <div className={className}>
                <p className='mb-3 font-bold'>{title}</p>

                {...Array(limit)
                    .fill(0)
                    .map((_, index) => (
                        <Skeleton
                            key={index}
                            className='mb-4 h-6 rounded-[8px]'
                        />
                    ))}

                <Skeleton className='mb-4 h-6 w-28 rounded-[8px]' />
            </div>
        );
    }
// фильтр-поиск
    const list = showAll
        ? items.filter(item =>
            item.text.toLowerCase().includes(seachValue.toLowerCase())
        )
        : (defaultItems || items).slice(0, limit);

    return (
        <div className={className}>
            <p className='mb-3 font-bold'>{title}</p>
            <div className='mb-5'>
                {showAll && (
                    <Input
                        onChange={onChangeSearchInput}
                        placeholder={searchInputPlaceholder}
                        className='border-none bg-gray-50'
                    />
                )}
            </div>

            <div className='scrollbar flex max-h-96 flex-col gap-4 overflow-auto pr-2'>
                {list.map((item, index) => (
                    <FilterCheckbox
                        key={index}
                        value={item.value}
                        text={item.text}
                        endAdornment={item.endAdornment}
                        checked={selectedValues?.has(item.value)}
                        onCheckedChange={() => onClickCheckbox?.(item.value)}

                    />
                ))}
            </div>

            {items.length > limit && (
                <div
                    className={cn(showAll ? 'mt-4 border-t border-t-neutral-100' : '')}
                >
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className='mt-3 text-primary'
                    >
                        {showAll ? 'Скрыть' : '+ Показать все'}
                    </button>
                </div>
            )}
        </div>
    );
};