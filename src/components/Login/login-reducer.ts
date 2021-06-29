import {loginAPI, responseType} from "../../api/api";
import {AppThunkType} from "../../state/redux-store";

const initialStateLogin: initialLoginType = {
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
    error: null,
    loadingRequest: false,
    logIn: false
}

export const loginReducer = (state: initialLoginType = initialStateLogin, action: actionsLoginType) => {
    switch (action.type) {
        case "LOGIN/LOGIN-USER":
            return {...state, ...action.payload}
        case 'LOGIN/LOADING-REQUEST':
            return {...state, ...action.payload}
        case 'LOGIN/LOG-IN':
            return {...state, ...action.payload}
        case 'LOGIN/INCORRECT-DATA-LOG-IN':
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
const loadingRequest = (loadingRequest: boolean) => {
    return {
        type: 'LOGIN/LOADING-REQUEST',
        payload: {loadingRequest}
    }
}
const logIn = (logIn: boolean) => {
    return {
        type: 'LOGIN/LOG-IN',
        payload: {logIn}
    }
}
export const incorrectDataLogIn = (error: string) => {
    return {
        type: 'LOGIN/INCORRECT-DATA-LOG-IN',
        payload: {error}
    }
}

//thunkC
export const loginUserTC = (emailValue: string, passwordValue: string): AppThunkType => async (dispatch) => {
    dispatch(loadingRequest(true))

    try {
        const response = await loginAPI.logIn(emailValue, passwordValue)
        dispatch(loginUser(response.data))
        dispatch(logIn(true))
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(incorrectDataLogIn(error))
    } finally {
        dispatch(loadingRequest(false))
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
    loadingRequest: boolean
    logIn: boolean
}
export type actionsLoginType = ReturnType<typeof loginUser>
    | ReturnType<typeof loadingRequest>
    | ReturnType<typeof logIn>
    | ReturnType<typeof incorrectDataLogIn>