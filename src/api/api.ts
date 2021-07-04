import axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://neko-back.herokuapp.com/2.0/'
})


//API
export const loginAPI = {
    logIn(email: string, password: string, rememberMe: boolean = false) {
        return instance.post<loginResponseType>('auth/login', {email, password, rememberMe})
    }
}
export const PasswordRecoveryAPI = {
    forgot(email: string) {
        return instance.post<PasswordRecoveryDataType>('/auth/forgot', {
            email,
            from: "test-front-admin <ai73a@yandex.by>",
            message: `<div style="background-color: lime; padding: 15px">password recovery link: 
                        <a href='https://IvanStupchyk.github.io/learning-cards#/new-password/$token$'>link</a></div>`
        })
    }
}
export const registrationAPI = {
    register(email: string, password: string) {
        return instance.post<registrationResponseType>('auth/register', {email, password})
    }
}

export const SetNewPasswordAPI = {
    setNewPassword (password: string, resetPasswordToken: string)  {
        return instance.post<SetNewPasswordDataType>("/auth/set-new-password", {
            password,
            resetPasswordToken,
        })
    },
}


//TYPES=====

//loginAPI
export type loginResponseType = {
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

//PasswordRecoveryAPI
export type PasswordRecoveryDataType = {
    error: string;
}

//SetNewPasswordAPI
export type SetNewPasswordDataType = {
    info: string
    error: string
}

//registrationAPI
type registrationResponseType = {
    addedUser: addedUserType
    error?: string
}
type addedUserType = {
    _id: string,
    email: string,
    rememberMe: boolean,
    isAdmin: boolean,
    name: string,
    verified: boolean,
    publicCardPacksCount: 0,
    created: string,
    updated: string,
    __v: number
}