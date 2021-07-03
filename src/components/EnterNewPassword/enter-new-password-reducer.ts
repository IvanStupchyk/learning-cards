import { AxiosError } from "axios";
import {AppThunkType} from "../../state/redux-store";
import {SetNewPasswordAPI} from "./enter-new-password-api";

const initialStateSetNewPassword = {
    error: '',
    loadingRequest: false,
    success: false,
}

//types
export type initialSetNewPasswordType = typeof initialStateSetNewPassword

const setError = (error: string) => ({type: 'SET-NEW-PASSWORD/SET_ERROR', payload: {error}} as const)
const setLoading = (loadingRequest: boolean) => ({type: 'SET-NEW-PASSWORD/SET_LOADING', payload: {loadingRequest}} as const)
const setSuccess = (success: boolean) => ({type: 'SET-NEW-PASSWORD/SET_SUCCESS', payload: {success}} as const)

export type actionsSetNewPasswordType = ReturnType<typeof setError> | ReturnType<typeof setLoading> | ReturnType<typeof setSuccess>

export const setNewPasswordReducer = (state: initialSetNewPasswordType = initialStateSetNewPassword, action: actionsSetNewPasswordType): initialSetNewPasswordType => {
    return action.type ? {...state, ...action.payload} : state
}

export const setNewPasswordThunk = (password: string, token: string): AppThunkType => async (dispatch) => {
    dispatch(setLoading(true))

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
}

