import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ResumeView} from '../model/resume'

interface ResumeTableState {
    resumes: ResumeView[]
}

const initialState: ResumeTableState = {
    resumes: [],
}

export const resumeTableSlice = createSlice({
    name: 'resumeTable',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<ResumeView[]>) => {
            state.resumes = action.payload
        },
        removeRow: (state, action: PayloadAction<string>) => {
           state.resumes = state.resumes.filter(item => item.id !== action.payload)
        },
    }
})

export const {
    setData,
    removeRow,
} = resumeTableSlice.actions

export default resumeTableSlice.reducer