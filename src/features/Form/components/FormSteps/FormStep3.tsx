import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, TextField } from '@mui/material'
import React, { FC, useMemo, useState } from 'react'
import FormTemplate from '../FormTemplate'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateUserMutation } from '../../../../services/users.service'
import { createSchema } from '../../schemas'
import { useAppSelector } from '../../../../store/hooks'
import { IFormStep, FormDataType } from '../../../../interfaces/form.interface'
import { useNavigate } from 'react-router-dom'

const FormStep3: FC<IFormStep> = ({ setActiveFormStep }) => {
    const [checkboxState, setCheckboxState] = useState({
        reading: false,
        coding: false,
        surfing: false,
    });
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckboxState({
            ...checkboxState,
            [event.target.id]: event.target.checked,
        });
    };

    const { reading, coding, surfing } = checkboxState;
    const schema = useMemo(() => createSchema('email'), []);

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema)
    });

    const [
        createUser,
        result,
    ] = useCreateUserMutation()

    const formData = useAppSelector((state) => state.form.form)
    const navigate = useNavigate();

    const onSubmit = (data: FormDataType) => {
        createUser({ ...formData, ...data, hobbies: checkboxState });
        //TODO:show success modal
        setActiveFormStep(-1)
        setTimeout(() => { navigate('/users') }, 2000)
    }
    return (
        <FormTemplate title="🦄 Step 3" onSubmit={handleSubmit(onSubmit)}>

            <TextField
                inputProps={register('email')}
                name="email"
                type="text"
                label="E-mail"
                error={!!errors.email}
                variant="outlined"
            />
            <FormControl
                required
                // error={error}
                component="fieldset"
                sx={{ m: 3 }}
                variant="standard"
            >
                <FormLabel component="legend">Pick your hobbies</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox checked={reading} onChange={handleChange} name="hobbies" id="reading" />
                        }
                        label="Reading"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox checked={coding} onChange={handleChange} name="hobbies" id="coding" />
                        }
                        label="Coding"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox checked={surfing} onChange={handleChange} name="hobbies" id="surfing" />
                        }
                        label="Surfing"
                    />
                </FormGroup>

            </FormControl>

            <Button variant="contained" type="submit" sx={{ mt: "20px" }}>
                Submit
            </Button>
        </FormTemplate>
    )
}

export default FormStep3