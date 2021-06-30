import axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://neko-back.herokuapp.com/2.0/'
})

type responseType={
    addedUser: addedUserType
    error?: string
}

type addedUserType={
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

export const authAPI={
    register(email: string, password: string){
        return instance.post<responseType>('auth/register', {email, password})
    }
}