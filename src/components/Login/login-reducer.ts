import {Dispatch} from "redux";
import {loginAPI, responseType} from "../../api/api";
import {AppThunkType} from "../../state/redux-store";

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
            debugger
            return {...state, ...action.payload}
        default:
            return state
    }
}

//actionC
const loginUser = (userData: responseType) => {
    return {
        type: 'LOGIN/LOGIN-USER',
        payload: {...userData}
    }
}

//thunkC
export const loginUserTC = (emailValue: string, passwordValue: string): AppThunkType => async (dispatch) => {
    try {
        const response = await loginAPI.logIn(emailValue, passwordValue)
        dispatch(loginUser(response.data))
        alert(response.data._id)
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