import {Dispatch} from "redux";
import {loginAPI} from "../../api/api";

const initialStateLogin = {
    _id: '',
    email: '',
    name: '',
    avatar: '',
    publicCardPacksCount: null,
    created: null,
    updated: null,
    isAdmin: false,
    verified: false,
    rememberMe: false,
    error: null
}

export const loginReducer = (state: initialLoginType = initialStateLogin, action: actionsLoginType) => {
    switch (action.type) {
        case "LOGIN/LOGIN-USER":
            return {...state, ...action.payload}
        default:
            return state
    }
}

//actionC
const loginUser = () => {
    return {
        type: 'LOGIN/LOGIN-USER',
        payload: {}
    }
}

//thunkC
export const loginUserTC = (emailValue: string, passwordValue: string) => async (dispatch: Dispatch) => {
    try {
        const response = await loginAPI.logIn(emailValue, passwordValue)
        alert('krasava')
    } catch (e) {
        alert(e)
    }
}



//types
export type initialLoginType = {
    _id: string
    email: string
    name: string
    avatar: string
    publicCardPacksCount: number | null
    created: Date | null
    updated: Date | null
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    error: string | null
}
export type actionsLoginType = ReturnType<typeof loginUser>