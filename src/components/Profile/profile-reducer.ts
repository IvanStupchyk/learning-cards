import {AppThunkType} from "../../state/redux-store";
import {Dispatch} from "redux";
import {authAPI} from "../../api/api";
import {updateUserAC} from "../Login/login-reducer";

type profileResponseType = {
    _id: string
    email: string
    name: string
    avatar: string
    publicCardPacksCount: number
}


const initialStateProfile = {
   profile:{
       _id: '',
       email: '',
       name: '',
       avatar: '',
       publicCardPacksCount: 0
   } as profileResponseType,
    loadingRequest: false,
}

export const profileReducer = (state: initialProfileType = initialStateProfile, action: actionsProfileType) => {
     switch (action.type) {
        case 'PROFILE/LOADING-REQUEST':
            return {...state, ...action.payload}
        default:
            return state
    }
}

//actionC
const loadingRequestAC = (loadingRequest: boolean) => ({
    type: 'PROFILE/LOADING-REQUEST',
    payload: {loadingRequest}
} as const)


//thunkC
export const updateProfile = (avatar: string, name: string): AppThunkType => async (dispatch: Dispatch<actionsProfileType>) => {
    dispatch(loadingRequestAC(true))
    try {
        const response = await authAPI.updateProfile(avatar, name)
        dispatch(updateUserAC(avatar, name))
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
export type actionsProfileType =
    | ReturnType<typeof loadingRequestAC>
    | ReturnType<typeof updateUserAC>

