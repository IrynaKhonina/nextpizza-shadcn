import { Suspense } from 'react';
import {Container, Filters, Title, TopBar} from "@/components/shared";
import {findPizzas, GetSearchParams} from "@/lib/find-pizzas";
import {ProductsGroupList} from "@/components/shared/products-group-list";


export default async function Home({
                                       searchParams,
                                   }: {
    searchParams: Promise<GetSearchParams>;
}) {
    const resolvedSearchParams = await searchParams;

    const categories = await findPizzas(resolvedSearchParams);

    return (
        <>
            <Container className='mt-10'>
                <Title
                    text='Все пиццы'
                    size='lg'
                    className='font-extrabold'
                />
            </Container>

            <TopBar
                categories={categories.filter(category => category.products.length > 0)}
            />

            {/*<Stories />*/}

            <Container className='mt-10 pb-14'>
                <div className='flex gap-[60px]'>
                    {/* FILTERS */}
                    <div className='w-[250px]'>
                        <Suspense>
                            <Filters />
                        </Suspense>
                    </div>

                    {/* PRODUCTS LIST */}
                    <div className='flex-1'>
                        <div className='flex flex-col gap-16'>
                            {categories.map(
                                category =>
                                    category.products.length > 0 && (
                                        <ProductsGroupList
                                            key={category.id}
                                            title={category.name}
                                            items={category.products}
                                            categoryId={category.id}
                                        />
                                    )
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}