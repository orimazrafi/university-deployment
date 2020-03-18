
export const UseFormData = (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'default_preset')
    return formData
}