import {Dispatch} from '@reduxjs/toolkit'
import {setError} from '../feutures/errorHandlerSlice'
import {AxiosError, HttpStatusCode} from 'axios'
import {Error} from '../model/error'
import {setLogin} from "../feutures/loginSlice";

const buildError = function ({message, response}: AxiosError): Error {
    if (response) {
        console.error(response.data)
    }
    return {isError: true, message: message}
}

export const handleError = (dispatch: Dispatch, err: AxiosError) => {
    if (err.response && err.response.status === HttpStatusCode.Unauthorized) {
        dispatch(setLogin(false))
    } else {
        dispatch(setError(buildError(err)))
    }
};