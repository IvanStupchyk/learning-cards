import axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://neko-back.herokuapp.com/2.0/'
})


//API
export const loginAPI = {
    logIn(email: string, password: string, rememberMe: boolean = false) {
        return instance.post<loginResponseType>('auth/login', {email, password, rememberMe})
    }
}
export const PasswordRecoveryAPI = {
    forgot(email: string) {
        return instance.post<PasswordRecoveryDataType>('/auth/forgot', {
            email,
            from: "test-front-admin <ai73a@yandex.by>",
            message: `<div style="background-color: lime; padding: 15px">password recovery link: 
                        <a href='https://IvanStupchyk.github.io/learning-cards#/new-password/$token$'>link</a></div>`
        })
    }
}
export const registrationAPI = {
    register(email: string, password: string) {
        return instance.post<registrationResponseType>('auth/register', {email, password})
    }
}
export const SetNewPasswordAPI = {
    setNewPassword(password: string, resetPasswordToken: string) {
        return instance.post<SetNewPasswordDataType>("/auth/set-new-password", {
            password,
            resetPasswordToken,
        })
    }
}
export const authAPI = {
    me() {
        return instance.post<loginResponseType>('/auth/me', {})
    },
    logOut() {
        return instance.delete<logOutType>('/auth/me')
    }
}
export const PacksListAPI = {
    getPacks(params: getPacksAPIParamsType) {
        return instance.get<resultGetPacksAPIType>(`/cards/pack?pageCount=50`)
    },
    addCardsPack(data: addCardsPackDataType) {
        return instance.post<Array<cardsPackType>>('/cards/pack', data)
    },
    deleteCardsPack(params: {id: string}) {
        return instance.delete<Array<cardsPackType>>('/cards/pack', {params})
    },
    changeCardsPack(data: {_id: string, name?: string}) {
        return instance.put<Array<cardsPackType>>('/cards/pack', data)
    },
}
export const CardsListAPI = {
    getCards(params: getCardsAPIParamsType) {
        return instance.get<resultGetCardsAPIType>(`/cards/card?cardsPack_id=${params.cardPack_id}`
            + "&pageCount=50")
    },
    addCard(data: addCardDataType) {
        return instance.post<Array<cardType>>('/cards/card', data)
    },
    deleteCard(params: {id: string}) {
        return instance.delete<Array<cardType>>('/cards/card', {params})
    },
    changeCard(data: {_id: string, question?: string, comments?: string}) {
        return instance.put<Array<cardType>>('/cards/card', data)
    },
}

//TYPES=====

//loginAPI
export type loginResponseType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number
    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    error?: string
}

//authAPI
type logOutType = {
    info: string,
    error: string
}

//PasswordRecoveryAPI
export type PasswordRecoveryDataType = {
    error: string;
}

//SetNewPasswordAPI
export type SetNewPasswordDataType = {
    info: string
    error: string
}

//registrationAPI
type registrationResponseType = {
    addedUser: addedUserType
    error?: string
}
type addedUserType = {
    _id: string,
    email: string,
    rememberMe: boolean,
    isAdmin: boolean,
    name: string,
    verified: boolean,
    publicCardPacksCount: 0,
    created: string,
    updated: string,
    __v: number
}

//PacsListAPI
type cardAndPackType = "pack" | "folder" | "card"
export type cardsPackType = {
    _id: string
    user_id: string
    user_name: string
    name: string
    path?: string
    cardsCount: number
    grade?: number
    shots?: number
    rating?: number
    type?: cardAndPackType
    created: string
    updated: string
    __v?: number
}
export type getPacksAPIParamsType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number
    user_id?: string
}
export type resultGetPacksAPIType = {
    cardPacks: Array<cardsPackType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
}
type addCardsPackDataType = {
   name?: string
   path?: string
   grade?: number
   shots?: number
   rating?: number
   deckCover?: string
   private?: boolean
   type?: string
}

//CardsListAPI
export type cardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    rating?: number
    type?: cardAndPackType
    created: string
    updated: string
    __v?: number
    _id: string
}
export type getCardsAPIParamsType = {
    cardAnswer?: string
    cardQuestion?: string
    cardPack_id: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}
export type resultGetCardsAPIType = {
    cards: Array<cardType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}
type addCardDataType = {
    cardsPack_id: string
    question?: string
    answer?: string
    grade?: number
    shots?: number
    rating?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    type?: cardAndPackType
}