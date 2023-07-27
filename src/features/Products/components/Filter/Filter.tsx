
import { TextField, Box, Button } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react'
import { useDebounce } from 'usehooks-ts'
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { useSearchParams } from 'react-router-dom'
import CategoriesSelect from '../CategoriesSelect/CategoriesSelect';

function Filter() {
    const [searchParams, setSearchParams] = useSearchParams();
    const category = searchParams.get('category');
    const [value, setValue] = useState<string>(searchParams.get('search'))
    const debouncedValue = useDebounce<string>(value, 800);
    const navigate = useNavigate();
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }
    const handleResetSearch = () => {
        setValue('')
        navigate('/products')
    }

    useEffect(() => {
        if ((debouncedValue?.length >= 3 || value?.length === 0) && !category) {
            setSearchParams({ search: debouncedValue })
        }
    }, [debouncedValue])


    return (
        <Box sx={{ display: 'flex', gap: '20px', mb: '20px' }}>
            <CategoriesSelect category={category} />
            {!category ?
                <TextField label="Search" variant="outlined" onChange={handleChange} value={value} sx={{ flex: 1 }}
                    InputProps={{
                        startAdornment: debouncedValue ?
                            <Button onClick={handleResetSearch} sx={{ position: 'absolute', right: '0' }}>
                                <RxCross2 />
                            </Button> : null,
                    }}
                /> : null}
        </Box>
    )
}

export default Filter