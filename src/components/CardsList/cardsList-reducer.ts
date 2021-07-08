import {
    addCardDataType,
    addCardsPackDataType,
    CardsListAPI, cardsPackType,
    cardType, getCardsAPIParamsType,
    PacksListAPI,
} from "../../api/api";
import {AppThunkType, GetAppStateType} from "../../state/redux-store";
import {Dispatch} from "redux";
import {actionPacksListType, GetPacksListAC} from "../PacksList/packsList-reducer";

const initialState = {
    arrayCard: [] as Array<cardType>,
    success: false
}

type initialStateType = typeof initialState
//types
type GetCardsListAT = ReturnType<typeof GetCardsListAC>
type SetSuccessAT = ReturnType<typeof SetSuccessAC>

export type actionCardsListType = GetCardsListAT | SetSuccessAT

//actionC
export const GetCardsListAC = (params: Array<cardType>) => ({type: 'cardList/GET-CARDSLIST', params} as const)
export const SetSuccessAC = (success: boolean) => ({type: 'cardList/SET-SUCCESS', success} as const)

export const cardsListReducer = (state = initialState, action: actionCardsListType): initialStateType => {
    switch (action.type) {
        case "cardList/GET-CARDSLIST":
            return {...state, arrayCard: action.params.map(cl => ({...cl}))}
        case "cardList/SET-SUCCESS":
            return {...state, success: action.success}
        default:
            return state
    }
}

//thunkC
export const getCardsList = (params: getCardsAPIParamsType): AppThunkType => async (dispatch: Dispatch<actionCardsListType>, getStore: GetAppStateType) => {

    try {
        const response = await CardsListAPI.getCards({...params})
        dispatch(GetCardsListAC(response.data.cards))
        dispatch(SetSuccessAC(true))
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(SetSuccessAC(false))
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

export const deleteCard = (params: {id: string, cardPack_id: string}): AppThunkType => async (dispatch: Dispatch<actionCardsListType>) => {

    try {
        const responseDelete = await CardsListAPI.deleteCard(params)
        const response = await CardsListAPI.getCards({cardPack_id: params.cardPack_id})
        dispatch(GetCardsListAC(response.data.cards))
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
    } finally {
    }
}
