import axios from 'axios'
import {getDownloadLink} from '../util/urlUtil'
import {Resume} from '../model/resume'
import {authHeader} from '../util/oauthUtil'

const baseURL = 'http://localhost:8080/resumes'

export const getAll = () => axios.get(
    baseURL,
    {headers: authHeader()}
)

export const getResume = (id: string) => axios.get<Resume>(
    `${baseURL}/${id}`,
    {headers: authHeader()}
)

export const download = (id: string) => axios.get(
    getDownloadLink(id),
    {headers: authHeader(), responseType: "blob"}
)

export const update = (resume: Resume) => axios.put(
    `${baseURL}/${resume.id}`,
    resume,
    {headers: authHeader()})

export const create = (resume: Resume) => axios.post(
    baseURL,
    resume,
    {headers: authHeader()}
)

export const remove = (id: string) => axios.delete(
    `${baseURL}/${id}`,
    {headers: authHeader()}
)