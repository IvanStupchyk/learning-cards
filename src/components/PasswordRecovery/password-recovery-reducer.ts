import {AxiosError} from "axios";
import {AppThunkType} from "../../state/redux-store";
import {PasswordRecoveryAPI} from "../../api/api";

const initialStatePasswordRecovery = {
    error: '',
    loadingRequest: false,
    success: false,
}

//actionC
const setError = (error: string) => ({
    type: 'PASSWORD-RECOVERY/SET_ERROR',
    payload: {error}
} as const)
const setLoadingRequest = (loadingRequest: boolean) => ({
    type: 'PASSWORD-RECOVERY/SET_LOADING',
    payload: {loadingRequest}
} as const)
export const setSuccess = (success: boolean) => ({
    type: 'PASSWORD-RECOVERY/SET_SUCCESS',
    payload: {success}
} as const)

export const passwordRecoveryReducer = (state: initialPasswordRecoveryType = initialStatePasswordRecovery, action: actionsPasswordRecoveryType): initialPasswordRecoveryType => {
    return action.type ? {...state, ...action.payload} : state
}

// switch (action.type) {
//     case 'PASSWORD-RECOVERY/SET_ERROR': {
//         return {...state, ...action.payload}
//     }
//     case 'PASSWORD-RECOVERY/SET_LOADING': {
//         return {...state, ...action.payload}
//     }
//     case 'PASSWORD-RECOVERY/SET_SUCCESS': {
//         return {...state, ...action.payload}
//     }
//     default: {
//         return state
//     }
// }

//thunkC
export const passwordRecoveryThunk = (email: string): AppThunkType => async (dispatch) => {
    dispatch(setLoadingRequest(true))

    try {
        const response = await PasswordRecoveryAPI.forgot(email)

        if (!!response.data.error) {
            console.log(response.data.error)
        } else {
            console.log("Not errors")
            dispatch(setSuccess(true))
        }
    } catch (error) {
        console.log(error)
        dispatch(setSuccess(false))
    } finally {
        dispatch(setLoadingRequest(false))
    }
}

//types
export type initialPasswordRecoveryType = typeof initialStatePasswordRecovery
export type actionsPasswordRecoveryType =
    ReturnType<typeof setError>
    | ReturnType<typeof setLoadingRequest>
    | ReturnType<typeof setSuccess>