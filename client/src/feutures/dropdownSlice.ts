import {createSlice} from '@reduxjs/toolkit'

export interface DropDownState {
    dropdownOpen: boolean
}

const initialState: DropDownState = {
    dropdownOpen: false
}

export const dropdownSlice = createSlice({
    name: 'dropdown',
    initialState,
    reducers: {
        toggle: (state) => {
            state.dropdownOpen =  !state.dropdownOpen
        },
    }
})

export const {
    toggle,
} = dropdownSlice.actions

export default dropdownSlice.reducer