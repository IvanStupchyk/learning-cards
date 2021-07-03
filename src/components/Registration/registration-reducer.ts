import {Dispatch} from "redux";
import {AppThunkType} from "../../state/redux-store";
import {registrationAPI} from "../../api/api";

const initialStateRegistration = {
    isRegistration: false,
    loadingRequest: false
}

export const registrationReducer = (state: initialRegistrationType = initialStateRegistration, action: actionsRegistrationType) => {
    return action.type ? {...state, ...action.payload} : state
}

//actionC
export const setRegistrationAC = (isRegistration: boolean) => ({
    type: 'REGISTRATION/SET-REGISTRATION', payload: {isRegistration}
} as const)
const loadingRequest = (loadingRequest: boolean) => ({
    type: 'REGISTRATION/LOADING-REQUEST',
    payload: {loadingRequest}
} as const)

//thunkC
export const setRegistrationTC = (email: string, password: string): AppThunkType => async (dispatch: Dispatch<actionsRegistrationType>) => {
    dispatch(loadingRequest(true))

    try {
        const response = await registrationAPI.register(email, password)
        dispatch(setRegistrationAC(true))
    } catch (e) {
        console.log(e)
    } finally {
        dispatch(loadingRequest(false))
    }
}

//types
export type initialRegistrationType = typeof initialStateRegistration
export type actionsRegistrationType = ReturnType<typeof setRegistrationAC> | ReturnType<typeof loadingRequest>