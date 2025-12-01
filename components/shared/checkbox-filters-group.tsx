'use client';

import React from 'react';

import { FilterCheckbox, FilterChecboxProps } from './filter-checkbox';
import { Input } from '../ui/input';

type Item = FilterChecboxProps;

interface Props {
    title: string;
    items: Item[];
    defaultItems?: Item[];
    limit?: number;
    searchInputPlaceholder?: string;
    className?: string;
    onChange?: (values: string[]) => void;
    defaultValue?: string[];
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
                                                          title,
                                                          items,
                                                          defaultItems,
                                                          limit = 5,
                                                          searchInputPlaceholder = 'Поиск...',
                                                          className,
                                                          onChange,
                                                          defaultValue,
                                                      }) => {
    const [showAll, setShowAll] = React.useState(false);
    const [selected, setSelected] = React.useState<Set<string>>(new Set([]));

    // Заменяем функции useSet
    const add = (value: string) => {
        setSelected(prev => new Set([...prev, value]));
    };

    const remove = (value: string) => {
        setSelected(prev => {
            const newSet = new Set(prev);
            newSet.delete(value);
            return newSet;
        });
    };

    const toggle = (value: string) => {
        setSelected(prev => {
            const newSet = new Set(prev);
            if (newSet.has(value)) {
                newSet.delete(value);
            } else {
                newSet.add(value);
            }
            return newSet;
        });
    };

    const onCheckedChange = (value: string) => {
        toggle(value);
    };

    React.useEffect(() => {
        if (defaultValue) {
            const initialSet = new Set(defaultValue);
            setSelected(initialSet);
        }
    }, [defaultValue]);

    React.useEffect(() => {
        onChange?.(Array.from(selected));
    }, [selected]);

    return (
        <div className={className}>
            <p className="font-bold mb-3">{title}</p>

            {showAll && (
                <div className="mb-5">
                    <Input placeholder={searchInputPlaceholder} className="bg-gray-50 border-none" />
                </div>
            )}

            <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
                {(showAll ? items : defaultItems || items).map((item) => (
                    <FilterCheckbox
                        onCheckedChange={() => onCheckedChange(item.value)}
                        checked={selected.has(item.value)}
                        key={String(item.value)}
                        value={item.value}
                        text={item.text}
                        endAdornment={item.endAdornment}
                    />
                ))}
            </div>

            {items.length > limit && (
                <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
                    <button onClick={() => setShowAll(!showAll)} className="text-primary mt-3">
                        {showAll ? 'Скрыть' : '+ Показать все'}
                    </button>
                </div>
            )}
        </div>
    );
};