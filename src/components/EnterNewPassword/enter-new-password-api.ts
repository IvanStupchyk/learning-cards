import axios from "axios";

// export const baseURL = "https://fp-cards-back-2.herokuapp.com/2.0/"
export const baseURL = "https://neko-back.herokuapp.com/2.0/"

export const instance = axios.create({
    baseURL,
    withCredentials: true,
});

export type SetNewPasswordDataType = {
    info: string
    error: string;
}

export const SetNewPasswordAPI = {
    setNewPassword: async (password: string, resetPasswordToken: string) => {
        const response = await instance.post<SetNewPasswordDataType>("/auth/set-new-password", {
            password,
            resetPasswordToken,
            });
        return response.data;
    },
};



