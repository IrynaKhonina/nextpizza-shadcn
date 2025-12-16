import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Title } from './title';
import { CountButton } from './count-button';
import Link from "next/link";
import Image from 'next/image';

interface Props {
    id: number;
    name: string;
    price: number;
    count?: number;
    imageUrl: string;
    className?: string;
}

export const ProductCard: React.FC<Props> = ({ name, price, count, imageUrl, className,id }) => {
    return (
        <div className={cn(className)}>
            <Link href={`/product/${id}`}>
                <div className={cn('relative h-60 w-60')}>
                    <Image
                        fill
                        sizes='100%'
                        src={imageUrl}
                        alt={name}
                        priority
                    />
                </div>
            </Link>


            <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />
            <p className="text-sm text-gray-400">
                Острая чоризо, острый перец халапеньо, соус барбекю, митболы, томаты, сладкий перец, красный лук, моцарелла
            </p>

            <div className="flex justify-between items-center mt-4">
        <span className="text-[20px]">
          от <b>{price} ₽</b>
        </span>

                {count ? (
                    <CountButton value={count} size="lg" />
                ) : (
                    <Button variant="secondary">
                        <Plus size={20} className="mr-1" />
                        Добавить
                    </Button>
                )}
            </div>
        </div>
    );
};