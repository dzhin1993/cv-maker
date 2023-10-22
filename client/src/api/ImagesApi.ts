import axios from 'axios'
import {authHeader} from '../util/oauthUtil'

const baseURL = 'http://localhost:8080/images'

export const getImage = (id: string) => axios.get<Blob>(
    `${baseURL}/${id}`,
    {responseType: "blob", headers: authHeader()}
)

export const remove = (id: string) => axios.delete(
    `${baseURL}/${id}`,
    {headers: authHeader()}
)

export const upload = (file: Blob) => {
    const data = new FormData()
    data.append('file', file)
    return axios.post(
        baseURL,
        data,
        {headers: authHeader()}
    )
}