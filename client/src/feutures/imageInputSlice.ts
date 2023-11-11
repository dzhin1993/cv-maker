import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface ImageInputSlice {
    image: Blob | null
}

const initialState: ImageInputSlice = {
    image: null
}

export const imageInputSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setImage: (state, action: PayloadAction<Blob>) => {
            state.image = action.payload
        },
        removeImage: (state) => {
            state.image = null
        }
    }
})

export const {
    setImage,
    removeImage,
} = imageInputSlice.actions

export default imageInputSlice.reducer