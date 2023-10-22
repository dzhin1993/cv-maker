export const convertDate = (date?: Date | null) => {
    return date ? new Date(date.toString()) : undefined
}

export const nullableDateToUndefined = (v: Date | null): Date | undefined => {
    return v ? v : undefined
}