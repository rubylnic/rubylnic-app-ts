import React, { FC } from 'react'
import FormTemplate from '../FormTemplate'
import { Button, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import { setForm } from '../../../../store/formSlice';
import { useDispatch } from 'react-redux'
import { createSchema } from '../../schemas';
import { IFormStep, FormDataType } from '../../../../interfaces/form.interface';

const FormStep1: FC<IFormStep> = ({ setActiveFormStep }) => {
    const dispatch = useDispatch();
    const schema = createSchema('firstName', 'lastName');
    createSchema('firstName', 'lastName');

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema)
    });

    const onSubmit = (data: FormDataType) => {
        dispatch(setForm(data))
        setActiveFormStep(2)
    }
    return (
        <FormTemplate title="🦄 Step 1" onSubmit={handleSubmit(onSubmit)}>


            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                inputProps={register('firstName')}
                name="firstName"
                type="text"
                label="First Name"
                error={!!errors.firstName}
                helperText={errors?.firstName?.message as string}
            />
            <TextField
                inputProps={register('lastName')}
                name="lastName"
                type="text"
                label="Last Name"
                error={!!errors.lastName}
                helperText={errors?.lastName?.message as string}
            />


            <Button variant="contained" type="submit" sx={{ mt: "20px" }}>
                Next
            </Button>
        </FormTemplate>
    )
}

export default FormStep1