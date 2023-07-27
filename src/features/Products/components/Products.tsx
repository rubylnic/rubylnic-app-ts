import { Alert, Box, CircularProgress, Grid, Skeleton, Typography } from '@mui/material';
import React from 'react'
import queryString from 'query-string';
import { Pagination } from 'src/components/ui/Pagination/Pagination';
import { useParams } from 'react-router';
import ProductCard from './ProductCard';
import { useSearchParams } from 'react-router-dom'
import { useGetProductsByCategoryQuery, useGetProductsQuery, useSearchProductsQuery } from 'src/services/products.service';


type Props = {
    category?: string,
}
export default function Products({ category, search, query }: Props) {
    const initialQuery = {
        skip: 0,
        limit: 6,
    };

    const queryStringified = query.skip ? queryString.stringify(query) : queryString.stringify(initialQuery);

    let fetched;
    if (category) {
        fetched = useGetProductsByCategoryQuery(category)
    } else if (search) {
        fetched = useSearchProductsQuery(search, { skipToken: true })
    } else {
        fetched = useGetProductsQuery(queryStringified);
    }
    const { data, error, isLoading, isFetching } = fetched;

    return (

        <Box>
            {isLoading && !error ?
                <Grid container spacing={2}>
                    {Array.from(Array(15)).map(() => <Grid item xs={6} md={4} lg={3} >
                        <Skeleton variant="rectangular" width='100%' height={400} />
                    </Grid>)}
                </Grid> :
                <Grid container spacing={2}>{
                    data.length ? data?.map(postInfo => (
                        <ProductCard key={postInfo.id} {...postInfo} />
                    )) : <Alert severity="info" sx={{ margin: "0 auto", marginTop: '35px', display: 'flex', justifyContent: 'center', width: '100%' }}>
                        No data found
                    </Alert>
                }
                </Grid>}
            {!category && !search ? <Pagination initialQuery={initialQuery} /> : null}
            {error ? <Alert severity="error">{error?.error}</Alert> : null}
        </Box>
    )
}