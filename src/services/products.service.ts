import { IProduct } from "../interfaces/product.interface";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://dummyjson.com/',
    }),
    tagTypes: ['Product'],
    endpoints: (build) => ({
        getProducts: build.query<IProduct[], string>({
            query: (query) => ({ url: `products?${query}` }),
            transformResponse: (response: IProduct[]) => response?.products,
            providesTags: ['Product'],
        }),
        searchProducts: build.query<IProduct[], string>({
            query: (query) => ({ url: `products/search?q=${query}` }),
            transformResponse: (response: IProduct[]) => response?.products,
            providesTags: ['Product'],
        }),
        getProductsByCategory: build.query<IProduct[], string>({
            query: (category) => ({ url: `products/category/${category}` }),
            transformResponse: (response: IProduct[]) => response?.products,
            providesTags: ['Product'],
        }),
        getProductsCategories: build.query<IProduct[], void>({
            query: () => ({ url: 'products/categories' }),
            transformResponse: (response: IProduct[]) => response,
        }),

    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProductsQuery, useSearchProductsQuery, useGetProductsByCategoryQuery, useGetProductsCategoriesQuery } = productsApi