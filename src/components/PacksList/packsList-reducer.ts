import {
    addCardsPackDataType,
    cardsPackType,
    getPacksAPIParamsType,
    PacksListAPI,
} from "../../api/api";
import {AppThunkType, GetAppStateType} from "../../state/redux-store";
import {Dispatch} from "redux";

const initialState: Array<cardsPackType> = []

//types
type GetPacksListAT = ReturnType<typeof GetPacksListAC>
// type AddPackAT = ReturnType<typeof AddPackAC>

export type actionPacksListType = GetPacksListAT

//actionC
export const GetPacksListAC = (params: Array<cardsPackType>) => ({type: 'packList/GET-PACKSLIST', params} as const)
//export const AddPackAC = (payload: addCardsPackDataType) => ({type: "packList/ADD-PACK", payload} as const)

export const packsListReducer = (state = initialState, action: actionPacksListType): Array<cardsPackType> => {
    switch (action.type) {
        case "packList/GET-PACKSLIST":
            return action.params.map(pl => ({...pl}))
        // case "packList/ADD-PACK":
        //     return [...state, {...action.payload}]
        default:
            return state
    }
}

//thunkC
export const getPackList = (params: getPacksAPIParamsType): AppThunkType => async (dispatch: Dispatch<actionPacksListType>, getStore: GetAppStateType) => {

    try {
        const response = await PacksListAPI.getPacks({...params})
        dispatch(GetPacksListAC(response.data.cardPacks))
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
    } finally {
    }
}

export const addPack = (data: addCardsPackDataType): AppThunkType => async (dispatch: Dispatch<actionPacksListType>) => {

    try {
        const responseAdd = await PacksListAPI.addCardsPack(data)
        const response = await PacksListAPI.getPacks({})
        dispatch(GetPacksListAC(response.data.cardPacks))
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
    } finally {
    }
}

