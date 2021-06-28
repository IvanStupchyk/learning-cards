import axios from "axios";

// export const baseURL = "https://neko-back.herokuapp.com/2.0/"
// export const baseURL = "https://fp-cards-back-2.herokuapp.com/2.0/"
export const baseURL = "https://neko-back.herokuapp.com/2.0/"

export const instance = axios.create({
    baseURL,
    withCredentials: true,
});

export type PasswordRecoveryDataType = {
    error: string;
}

export const PasswordRecoveryAPI = {
    forgot: async (email: string) => {
        const response = await instance.post<PasswordRecoveryDataType>("/auth/forgot", {
            email,
            from: "test-front-admin <ai73a@yandex.by>",
            message: `
<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='http://localhost:3000/learning-cards#/new-password/$token$'>link</a>
</div>`
        });
        return response.data;
    },
};