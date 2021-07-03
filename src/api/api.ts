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

export type PasswordRecoveryDataType = {
    error: string;
}

export const PasswordRecoveryAPI = {
    forgot(email: string) {
        return instance.post<PasswordRecoveryDataType>('/auth/forgot', {
            email,
            from: "test-front-admin <ai73a@yandex.by>",
            message: `<div style="background-color: lime; padding: 15px">password recovery link: 
                        <a href='http://localhost:3000/learning-cards#/new-password/$token$'>link</a></div>`
        })
    }
}

// forgot: async (email: string) => {
//     const response = await instance.post<{error: string}>("/auth/forgot", {
//         email,
//         from: "test-front-admin <ai73a@yandex.by>",
//         message: `<div style="background-color: lime; padding: 15px">password recovery link:
//                         <a href='http://localhost:3000/learning-cards#/new-password/$token$'>link</a></div>`
//     });
//     return response.data;
// },