import { useEditUserByIdMutation } from '../../../services/users.service';
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material'
import React, { Dispatch, SetStateAction, useState } from 'react'
// import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, Path, useForm } from 'react-hook-form'
import FormTemplate from './FormTemplate';
import { createSchema } from '../schemas';
import { FormDataType } from '../../../interfaces/form.interface';


type EditFormProps = {
    id: string | string[] | undefined
    formInfo: {
        name: string,
        label: string,
        type: string,
        initialValue: any,
        values: {
            label: string,
            value: string | boolean
        }[],
    },
    setModalOpen: Dispatch<SetStateAction<boolean>>
}

export default function EditForm({ id, formInfo, setModalOpen }: EditFormProps) {
    const { name, label, type, initialValue, values } = formInfo;
    const [checkboxState, setCheckboxState] = useState(initialValue);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckboxState({
            ...checkboxState,
            [event.target.id]: event.target.checked,
        });
    };
    // форма с разными видами инпутов
    const schema = createSchema(name)

    const [
        editUser,
        result,
    ] = useEditUserByIdMutation()

    const { register, handleSubmit, formState: { errors }, control, setValue } = useForm<FormDataType>({
        mode: "onBlur",
        resolver: yupResolver(schema)
    });

    const onSubmit = (data: FormDataType) => {
        const additionalData = type === 'checkbox' ? { hobbies: { ...checkboxState } } : null;
        editUser({ id, data: { ...data, ...additionalData } });
        setModalOpen(false)
    }

    return (
        <FormTemplate onSubmit={handleSubmit(onSubmit)}>
            {type === 'radio' && <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                <Controller
                    control={control}
                    name="gender"
                    render={({
                        field: { onChange, onBlur, value, name, ref },
                        fieldState: { invalid, isTouched, isDirty, error },
                        formState,

                    }) => (
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue={initialValue}
                            name="radio-buttons-group"
                            value={value ?? initialValue}
                            onChange={(e) => {
                                onChange(e);
                                setValue(name, e.target.value); // will be called this time
                            }}

                        >
                            {values.map(item => (
                                <FormControlLabel value={item.value} control={<Radio />} label={item.label} />
                            ))}
                        </RadioGroup>
                    )}
                />
            </FormControl>}
            {type === 'text' && <TextField inputProps={register(name as Path<FormDataType>)} id="outlined-basic" label={label} error={!!errors[name as keyof FormDataType]} variant="outlined" defaultValue={initialValue} required />}
            {type === 'checkbox' && <FormControl
                required
                // error={error}
                component="fieldset"
                sx={{ m: 3 }}
                variant="standard"
            >
                <FormLabel component="legend">Pick your hobbies</FormLabel>
                <FormGroup>
                    {values.map(item => {
                        console.log(checkboxState[item.label], item.label, 'label')
                        return (
                            <FormControlLabel
                                control={
                                    <Checkbox checked={checkboxState[item.label]} onChange={handleChange} name={item.label} id={item.label} />
                                }
                                label={item.label}
                            />
                        )
                    })}

                </FormGroup>
                <FormHelperText>You can display an error</FormHelperText>
            </FormControl>}
            <Button sx={{ mt: "15px" }} variant="contained" type="submit">
                Submit
            </Button>
        </FormTemplate>
    )
}