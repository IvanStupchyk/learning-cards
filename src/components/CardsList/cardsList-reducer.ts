import {
    addCardDataType,
    addCardsPackDataType,
    CardsListAPI,
    cardType, getCardsAPIParamsType,
    PacksListAPI,
} from "../../api/api";
import {AppThunkType, GetAppStateType} from "../../state/redux-store";
import {Dispatch} from "redux";
import {actionPacksListType, GetPacksListAC} from "../PacksList/packsList-reducer";

const initialState: Array<cardType> = []

//types
type GetCardsListAT = ReturnType<typeof GetCardsListAC>

export type actionCardsListType = GetCardsListAT

//actionC
export const GetCardsListAC = (params: Array<cardType>) => ({type: 'cardList/GET-CARDSLIST', params} as const)

export const cardsListReducer = (state = initialState, action: actionCardsListType): Array<cardType> => {
    switch (action.type) {
        case "cardList/GET-CARDSLIST":
            return action.params.map(cl => ({...cl}))
        default:
            return state
    }
}

//thunkC
export const getCardsList = (params: getCardsAPIParamsType): AppThunkType => async (dispatch: Dispatch<actionCardsListType>, getStore: GetAppStateType) => {

    try {
        const response = await CardsListAPI.getCards({...params})
        dispatch(GetCardsListAC(response.data.cards))
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
    } finally {
    }
}

export const addCard = (data: addCardDataType): AppThunkType => async (dispatch: Dispatch<actionCardsListType>) => {

    try {
        const responseAdd = await CardsListAPI.addCard(data)
        const response = await CardsListAPI.getCards({cardPack_id: data.card.cardsPack_id})
        dispatch(GetCardsListAC(response.data.cards))
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
    } finally {
    }
}

