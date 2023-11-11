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
        toggleDropdown: (state) => {
            state.dropdownOpen =  !state.dropdownOpen
        },
    }
})

export const {
    toggleDropdown,
} = dropdownSlice.actions

export default dropdownSlice.reducer