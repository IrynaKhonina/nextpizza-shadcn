    import {Container, Filters, Title, TopBar} from "@/components/shared";
    import {ProductsGroupList} from "@/components/shared/products-group-list";


    export default function Home() {
        return (
            <>
                <Container className="mt-10 ">
                    <Title text="Все пиццы" size="lg" className="font-extrabold"/>
                </Container>
                <TopBar/>



                <Container className='mt-10 pb-14]'>
                    <div className="flex gap-[80px]">

                        {/*ФИЛЬТРАЦИЯ*/}
                        <div className="w-[250px]">
                            <Filters />
                        </div>

                        {/*СПИСОК ТОВАРОВ*/}
                        <div className="flex-1">

                            <div className="flex flex-col gap-16">
                                <ProductsGroupList
                                title="Пиццы"
                                categoryId={1}
                                items={[{
                                    id : 1,
                                    name:"Диабло",
                                    imageUrl:"https://media.dodostatic.net/image/r:584x584/0198bf439a007604880d0231be87cd3e.avif",
                                    price:550,
                                    items: [{price:550}]

                                }]}
                                />
                                <ProductsGroupList
                                    title="Комбо"
                                    categoryId={2}
                                    items={[{
                                        id : 2,
                                        name:"Диабло",
                                        imageUrl:"https://media.dodostatic.net/image/r:584x584/0198bf439a007604880d0231be87cd3e.avif",
                                        price:550,
                                        items: [{price:550}]
                                    }]}
                                />
                                <ProductsGroupList
                                    title="Закуски"
                                    categoryId={3}
                                    items={[{
                                        id : 3,
                                        name:"Диабло",
                                        imageUrl:"https://media.dodostatic.net/image/r:584x584/0198bf439a007604880d0231be87cd3e.avif",
                                        price:550,
                                        items: [{price:550}]
                                    }]}
                                />
                                <ProductsGroupList
                                    title="Коктейли"
                                    categoryId={4}
                                    items={[{
                                        id : 4,
                                        name:"Диабло",
                                        imageUrl:"https://media.dodostatic.net/image/r:584x584/0198bf439a007604880d0231be87cd3e.avif",
                                        price:550,
                                        items: [{price:550}]
                                    }]}
                                />

                            </div>

                            <div className="flex items-center gap-6 mt-12">
                                {/*<Pagination pageCount={3} />*/}
                                <span className="text-sm text-gray-400">5 из 65</span>
                            </div>
                        </div>
                    </div>
                </Container>


            </>
        );
    }