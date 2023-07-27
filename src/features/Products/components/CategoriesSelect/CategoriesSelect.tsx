import { MenuItem, Select, FormControl, InputLabel, Button } from '@mui/material';
import React from 'react'
import { useNavigate } from "react-router-dom";
import { useSearchParams } from 'react-router-dom'
import { useGetProductsCategoriesQuery } from 'src/services/products.service';

type Props = {
    category: string,
}
function CategoriesSelect({ category }: Props) {
    const { data, error, isLoading, isFetching } = useGetProductsCategoriesQuery();
    const [, setSearchParams] = useSearchParams();

    const navigate = useNavigate();

    return (
        <FormControl>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category!! ? category : ''}
                label="Category"
                onChange={(e) => setSearchParams({ category: e.target.value })}
                sx={{ minWidth: '200px', flex: 1, mb: "10px" }}

            >
                {data?.map(item => <MenuItem value={item} > {item}</MenuItem>)}
            </Select >
            <Button variant="contained" onClick={() => { navigate('/products') }} disabled={category ? false : true}>
                Reset
            </Button>
        </FormControl>
    )
}

export default CategoriesSelect