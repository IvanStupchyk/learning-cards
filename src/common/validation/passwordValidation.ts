export const passwordValidation = (value: string) => {
    return /[0-9a-zA-Z!@#$%^&*]{8,}/.test(value)
}