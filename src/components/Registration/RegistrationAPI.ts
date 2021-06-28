import axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:7542/2.0/'
})

type responseType={
    error?: string
}

export const authAPI={
    register(email: string, password: string){
        return instance.post<responseType>('auth/register', {email, password})
    }
}