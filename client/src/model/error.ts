export interface Error {
    isError: boolean
    message: string
}

export const errorDefault: Error = {
    isError: false,
    message: ""
}