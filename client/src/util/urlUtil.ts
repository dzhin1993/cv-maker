export const getDownloadLink = (id: string): string => {
    return `http://localhost:8080/resumes/${id}/file`
}