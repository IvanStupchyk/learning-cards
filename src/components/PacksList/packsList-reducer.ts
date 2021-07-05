import {
    cardsPackType,
    getPacksAPIParamsType,
    PacksListAPI,
    registrationAPI,
    resultGetPacksAPIType
} from "../../api/api";
import {AppThunkType, GetAppStateType} from "../../state/redux-store";
import {Dispatch} from "redux";
import {setServerErrorMessageRegistration} from "../Registration/registration-reducer";

const initialState: Array<cardsPackType> = []

//types
type GetPacksListAT = ReturnType<typeof GetPacksListAC>

export type actionPacksListType = GetPacksListAT

//actionC
export const GetPacksListAC = (params: Array<cardsPackType>) => ({type: 'packList/GET-PACKSLIST', params} as const)

export const packsListReducer = (state = initialState, action: actionPacksListType): Array<cardsPackType> => {
    switch (action.type) {
        case "packList/GET-PACKSLIST":
            return action.params.map(pl => ({...pl}))
        default:
            return state
    }
}

//thunkC
export const getPackList = (params: getPacksAPIParamsType): AppThunkType => async (dispatch: Dispatch<actionPacksListType>, getStore: GetAppStateType) => {

    try {
        const response = await PacksListAPI.getPacks({})
        debugger
        dispatch(GetPacksListAC(response.data.cardPacks))
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
    } finally {
    }
}

