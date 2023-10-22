export const trimEmptyTags = (value: string) : string | undefined => {
    const aux = document.createElement('div');
    aux.innerHTML = value;
    const content = aux.innerText.trim();
    if (content === "") {
        return undefined
    }
    return value
}