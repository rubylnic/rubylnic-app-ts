import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './index'

// Define a type for the slice state
interface FormState {
    firstName?: string,
    lastName?: string,
    email?: string,
    hasPhone?: boolean,
    // phoneNumber?: number | undefined,
}
interface FormObjectState {
    form: FormState
}

// Define the initial state using that type
// FIXME: добавить все значения формы
const initialState: FormObjectState = {
    form: {
        firstName: '',
        lastName: '',
        email: '',
        hasPhone: false,
        // phoneNumber: undefined,
    }
}

export const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setForm: (state, action: PayloadAction<FormState>) => {
            state.form = { ...state.form, ...action.payload }
        },
    },
})


export const { setForm } = formSlice.actions


export const selectForm = (state: RootState) => state.form.form;

export default formSlice.reducer