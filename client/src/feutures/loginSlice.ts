import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface LoginSlice {
    isLogin: boolean
}

const initialState: LoginSlice = {
    isLogin: false
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setLogin: (state, action: PayloadAction<boolean>) => {
            state.isLogin = action.payload
        },
    }
})

export const {
    setLogin,
} = loginSlice.actions

export default loginSlice.reducer