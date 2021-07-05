import {AppThunkType} from "../../state/redux-store";
import {Dispatch} from "redux";
import {authAPI} from "../../api/api";
import {loginUser} from "../Login/login-reducer";

const initialStateProfile = {
   profile:{
       _id: '',
       email: '',
       name: '',
       avatar: '',
       publicCardPacksCount: 0
   },
    loadingRequest: false,
}

export const profileReducer = (state: initialProfileType = initialStateProfile, action: actionsProfileType) => {
    switch (action.type) {
        case 'PROFILE/UPDATE-PROFILE':
            return {...state, ...action.payload}
        case 'PROFILE/LOADING-REQUEST':
            return {...state, ...action.payload}
        default:
            return state
    }
}

//actionC
const updateProfileAC = (avatar: string, name: string) => ({
    type: 'PROFILE/UPDATE-PROFILE',
    payload: {avatar, name}
} as const)
const loadingRequestAC = (loadingRequest: boolean) => ({
    type: 'PROFILE/LOADING-REQUEST',
    payload: {loadingRequest}
} as const)


//thunkC
export const updateProfile = (avatar: string, name: string): AppThunkType => async (dispatch: Dispatch<actionsProfileType>) => {
    dispatch(loadingRequestAC(true))
    try {
        const response = await authAPI.updateProfile(avatar, name)
        dispatch(updateProfileAC(avatar, name))
    } catch (e) {
        /*const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(setServerErrorMessageRegistration(error))*/
    } finally {
        dispatch(loadingRequestAC(false))
    }
}

//types
type initialProfileType = typeof initialStateProfile
export type actionsProfileType = | ReturnType<typeof loginUser>
    | ReturnType<typeof updateProfileAC>
    | ReturnType<typeof loadingRequestAC>

export type profileType={
    _id: string,
    email: string,
    name: string,
    avatar: string,
    publicCardPacksCount: number
}