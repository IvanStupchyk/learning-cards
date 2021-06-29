import {Dispatch} from "redux";
import {authAPI} from "./RegistrationAPI";
import {AppThunkType} from "../../state/redux-store";

const initialStateRegistration = {
    isRegistration: false
}


export const registrationReducer = (state: initialRegistrationType = initialStateRegistration, action: actionsRegistrationType) => {
    switch (action.type) {
        case 'REGISTRATION/SET-REGISTRATION': {
            return {
                ...state, isRegistration: action.isRegistration
            }
        }
        default:
            return state
    }
}


//types
export type initialRegistrationType = {
    isRegistration: boolean
}
export type actionsRegistrationType = ReturnType<typeof setRegistrationAC>

export const setRegistrationAC = (isRegistration: boolean) => ({
    type: 'REGISTRATION/SET-REGISTRATION', isRegistration
} as const)

export const setRegistrationTC = (email: string, password: string):AppThunkType => (dispatch: Dispatch<actionsRegistrationType>) => {
    authAPI.register(email, password)
        .then(res => {
            dispatch(setRegistrationAC(true))
        })
        .catch((res) => {
            console.log(res.error)
        })
}
