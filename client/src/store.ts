import {configureStore} from '@reduxjs/toolkit'
import resumeTableReducer from './feutures/resumeTableSlice'
import resumeInputReducer from './feutures/resumeInputSlice'
import imageInputReducer from './feutures/imageInputSlice'
import errorHandlerReducer from './feutures/errorHandlerSlice'
import dropdown from './feutures/dropdownSlice'
import resumeCreateModal from './feutures/resumeCreateModalSlice'
import loginReducer from './feutures/loginSlice'

export const store = configureStore({
    reducer: {
        resumeInput: resumeInputReducer,
        imageInput: imageInputReducer,
        errorHandler: errorHandlerReducer,
        resumeTable: resumeTableReducer,
        resumeCreateModal: resumeCreateModal,
        login: loginReducer,
        dropdown: dropdown,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(
        {serializableCheck: false}
    )
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

