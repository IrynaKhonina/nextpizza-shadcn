    import { prisma } from '@/lib/prisma';

    export interface GetSearchParams {
        query?: string;
        sortBy?: string;
        sizes?: string;
        pizzaTypes?: string;
        ingredients?: string;
        priceFrom?: string;
        priceTo?: string;
        limit?: string;
        page?: string;
    }

    const DEFAULT_MIN_PRICE = 0;
    const DEFAULT_MAX_PRICE = 1000;

    const parseNumberArray = (value?: string) =>
        value
            ? value.split(',').map(Number).filter(n => !isNaN(n))
            : undefined;

    export const findPizzas = async (params: GetSearchParams = {}) => {
        const sizes = parseNumberArray(params.sizes);
        const pizzaTypes = parseNumberArray(params.pizzaTypes);
        const ingredientsIdArr = parseNumberArray(params.ingredients);

        const minPrice =
            params.priceFrom !== undefined
                ? Number(params.priceFrom) || DEFAULT_MIN_PRICE
                : DEFAULT_MIN_PRICE;

        const maxPrice =
            params.priceTo !== undefined
                ? Number(params.priceTo) || DEFAULT_MAX_PRICE
                : DEFAULT_MAX_PRICE;

        const categories = await prisma.category.findMany({
            include: {
                products: {
                    orderBy: { id: 'desc' },
                    where: {
                        ingredients: ingredientsIdArr
                            ? {
                                some: {
                                    id: { in: ingredientsIdArr }
                                }
                            }
                            : undefined,

                        variants: {
                            some: {
                                size:
                                    sizes && sizes.length > 0
                                        ? { in: sizes }
                                        : undefined,

                                pizzaType:
                                    pizzaTypes && pizzaTypes.length > 0
                                        ? { in: pizzaTypes }
                                        : undefined,

                                price: {
                                    gte: minPrice,
                                    lte: maxPrice
                                }
                            }
                        }
                    },
                    include: {
                        ingredients: true,
                        variants: {
                            where: {
                                price: {
                                    gte: minPrice,
                                    lte: maxPrice
                                }
                            },
                            orderBy: { price: 'asc' }
                        }
                    }
                }
            }
        });

        return categories;
    };
