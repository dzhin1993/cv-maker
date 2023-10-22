export const openFileInNewTab = (data: BlobPart) => {
    const blob = new Blob([data], {type: 'application/pdf'})
    const url = URL.createObjectURL(blob)
    window.open(url, '_blank')
};