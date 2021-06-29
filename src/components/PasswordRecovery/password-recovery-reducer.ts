import { AxiosError } from "axios";
import {AppThunkType} from "../../state/redux-store";
import {PasswordRecoveryAPI} from "./password-recovery-api";

const initialStatePasswordRecovery = {
    error: '',
    loading: false,
    success: false,
}

//types
export type initialPasswordRecoveryType = typeof initialStatePasswordRecovery

const setError = (error: string) => ({type: "password-recovery/SET_ERROR", error} as const)
const setLoading = (loading: boolean) => ({type: "password-recovery/SET_LOADING", loading} as const)
const setSuccess = (success: boolean) => ({type: "password-recovery/SET_SUCCESS", success} as const)

export type actionsPasswordRecoveryType = ReturnType<typeof setError> | ReturnType<typeof setLoading> | ReturnType<typeof setSuccess>

export const passwordRecoveryReducer = (state: initialPasswordRecoveryType = initialStatePasswordRecovery, action: actionsPasswordRecoveryType): initialPasswordRecoveryType => {
    switch (action.type) {
        case "password-recovery/SET_ERROR": {
            return {
                ...state,
                error: action.error,
                loading: false,
                success: false,
            }
        }
        case "password-recovery/SET_LOADING": {
            return {
                ...state,
                error: "",
                loading: action.loading,
                success: false,
            }
        }
        case "password-recovery/SET_SUCCESS": {
            return {
                ...state,
                error: "",
                loading: false,
                success: action.success,
            }
        }
        default: {
            return state
        }
    }
}


export const passwordRecoveryThunk = (email: string = "bovkunovichmarinacv@gmail.com"): AppThunkType => async (
    dispatch) => {
    dispatch(setLoading(true));
    PasswordRecoveryAPI.forgot(email)
        .then(res => {
            if (!res.error) {
                console.log(res.error)
            } else {
                console.log("Not errors")
                dispatch(setSuccess(true))
            }
        })
        .catch((error: AxiosError) => {
            console.log(error)
            dispatch(setSuccess(false))
        })
        .finally(() => {
            dispatch(setLoading(false))
        })
};

