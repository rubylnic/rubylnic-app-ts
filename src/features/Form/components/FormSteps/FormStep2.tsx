import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material'
import FormTemplate from '../FormTemplate'
import { useDispatch } from 'react-redux'
import { setForm } from '../../../../store/formSlice'
import { Controller, useForm } from 'react-hook-form'
import { IFormStep, FormDataType } from '../../../../interfaces/form.interface'
// import styles from './CarItem.module.scss'

const FormStep2: FC<IFormStep> = ({ setActiveFormStep }) => {
    const { register, handleSubmit, control, formState: { errors }, setValue } = useForm();
    const dispatch = useDispatch();
    const onSubmit = (data: FormDataType) => {
        dispatch(setForm(data))
        setActiveFormStep(3)
    }
    return (
        <FormTemplate title="🦄 Step 2" onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                <Controller
                    control={control}
                    name="sex"
                    render={({
                        field: { onChange, onBlur, value, name, ref },
                        fieldState: { invalid, isTouched, isDirty, error },
                        formState,

                    }) => (
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                            value={value ?? "other"}
                            onChange={(e) => {
                                onChange(e);
                                setValue('sex', e.target.value); // will be called this time
                            }}

                        >
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                        </RadioGroup>
                    )}
                />
            </FormControl>
            <Button variant="contained" type="submit" sx={{ mt: "20px" }}>
                Next
            </Button>
        </FormTemplate>
    )
}

export default FormStep2