import {createSlice} from '@reduxjs/toolkit'

interface ResumeCreateModalState {
    isOpen: boolean
}

const initialState: ResumeCreateModalState = {
    isOpen: false,
}

export const resumeCreateModalSlice = createSlice({
    name: 'resumeCreateModal',
    initialState,
    reducers: {
        toggleModal: (state) => {
            state.isOpen =  !state.isOpen
        },
    }
})

export const {
    toggleModal,
} = resumeCreateModalSlice.actions

export default resumeCreateModalSlice.reducer