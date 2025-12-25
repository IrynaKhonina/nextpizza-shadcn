import { notFound } from 'next/navigation';


import {ProductForm} from "@/components/shared/product-form";
import {Container} from "@/components/shared";
import {prisma} from "@/lib/prisma";


export default async function ProductPage({
                                              params: { id }
                                          }: {
    params: { id: string };
}) {
    const product = await prisma.product.findFirst({
        where: {
            id: Number(id)
        },
        include: {
            ingredients: true,
            category: {
                include: {
                    products: {
                        include: {
                            variants: true
                        }
                    }
                }
            },
            variants: true
        }
    });

    if (!product) return notFound();

    return (
        <Container className='my-10 flex flex-col'>
            <ProductForm product={product} />
        </Container>
    );
}