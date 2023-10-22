import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
    errorDefault, Error
} from '../model/error'


export interface ErrorState {
    error: Error
}

const initialState: ErrorState = {
    error: errorDefault,
}

export const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<Error>) => {
            state.error = action.payload
        },
        toggle: (state) => {
            state.error.isError =  !state.error.isError
        },
    }
})

export const {
    setError,
    toggle,
} = errorSlice.actions

export default errorSlice.reducer