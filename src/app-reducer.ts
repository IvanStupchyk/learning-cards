import React from "react";
/*
import {AppThunkType} from "./state/redux-store";
import {authAPI} from "./api/api";
import {setProfileAC} from "./components/Profile/profile-reducer";
import {Dispatch} from "redux";

type InitialStateType = typeof initialStateApp

const initialStateApp = {
    isInitialized: false as boolean
}

export const appReducer = (state: InitialStateType = initialStateApp, action: actionsAppType) => {
    switch (action.type) {
        case 'APP/SET-IS-INITIALIZED':
            return {...state, ...action.payload}
        default:
            return state
    }
}

//actionC
export const setIsInitializedAC = (isInitialized: boolean) => {
    return {
        type: 'APP/SET-IS-INITIALIZED',
        payload: {isInitialized}
    } as const
}

//thunkC
export const initializedAppTC  = (): AppThunkType => async (dispatch: Dispatch<actionsAppType>) => {
    try {
        const response = await authAPI.me()
        dispatch(setIsInitializedAC(true))
        dispatch(setProfileAC(response.data))
    } catch (e) {
        /!*const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(setServerErrorMessageRegistration(error))*!/
    } finally {
    }
}




//types
export type actionsAppType =
    | ReturnType<typeof  setIsInitializedAC>
    | ReturnType<typeof setProfileAC>
*/



