import { AxiosError } from "axios";
import {AppThunkType} from "../../state/redux-store";
import {SetNewPasswordAPI} from "./enter-new-password-api";

const initialStateSetNewPassword = {
    error: '',
    loading: false,
    success: false,
}

//types
export type initialSetNewPasswordType = typeof initialStateSetNewPassword

const setError = (error: string) => ({type: "set-new-password/SET_ERROR", error} as const)
const setLoading = (loading: boolean) => ({type: "set-new-password/SET_LOADING", loading} as const)
const setSuccess = (success: boolean) => ({type: "set-new-password/SET_SUCCESS", success} as const)

export type actionsSetNewPasswordType = ReturnType<typeof setError> | ReturnType<typeof setLoading> | ReturnType<typeof setSuccess>

export const setNewPasswordReducer = (state: initialSetNewPasswordType = initialStateSetNewPassword, action: actionsSetNewPasswordType): initialSetNewPasswordType => {
    switch (action.type) {
        case "set-new-password/SET_ERROR": {
            return {
                ...state,
                error: action.error,
                loading: false,
                success: false,
            }
        }
        case "set-new-password/SET_LOADING": {
            return {
                ...state,
                error: "",
                loading: action.loading,
                success: false,
            }
        }
        case "set-new-password/SET_SUCCESS": {
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

export const setNewPasswordThunk = (password: string, token: string): AppThunkType => async (
    dispatch) => {
    dispatch(setLoading(true));
    SetNewPasswordAPI.setNewPassword(password, token)
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

