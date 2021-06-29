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
    loadingRequest: false
}

export const loginReducer = (state: initialLoginType = initialStateLogin, action: actionsLoginType) => {
    switch (action.type) {
        case "LOGIN/LOGIN-USER":
            return {...state, ...action.payload}
        case 'LOGIN/LOADING-REQUEST':
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

//thunkC
export const loginUserTC = (emailValue: string, passwordValue: string): AppThunkType => async (dispatch) => {
    dispatch(loadingRequest(true))
    try {
        const response = await loginAPI.logIn(emailValue, passwordValue)
        dispatch(loginUser(response.data))
        alert(response.data._id)
    } catch (e) {
        alert('beda')
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
}
export type actionsLoginType = ReturnType<typeof loginUser>
    | ReturnType<typeof loadingRequest>