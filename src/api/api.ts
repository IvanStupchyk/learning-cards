import axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://neko-back.herokuapp.com/2.0/'
})

export type responseType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number
    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    error?: string
}

export const loginAPI = {
    logIn(email: string, password: string, rememberMe: boolean = false) {
        return instance.post<responseType>('auth/login', {email, password, rememberMe})
    }
}