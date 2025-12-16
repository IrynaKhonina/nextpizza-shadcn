import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Title } from './title';
import { CountButton } from './count-button';
import Link from "next/link";

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
            <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
                <img className="w-[215px] h-[215px]" src={imageUrl} alt={name} />
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