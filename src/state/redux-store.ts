import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk, {ThunkAction} from 'redux-thunk';
import {actionsLoginType, loginReducer} from "../components/Login/login-reducer";
import {
    actionsPasswordRecoveryType,
    passwordRecoveryReducer
} from "../components/PasswordRecovery/password-recovery-reducer";
import {
    actionsSetNewPasswordType,
    setNewPasswordReducer
} from "../components/EnterNewPassword/enter-new-password-reducer";
import {actionsProfileType, profileReducer} from "../components/Profile/profile-reducer";
import {actionsRegistrationType, registrationReducer} from "../components/Registration/registration-reducer";
import {actionPacksListType, packsListReducer} from "../components/PacksList/packsList-reducer";


export const rootReducer = combineReducers({
    login: loginReducer,
    PasswordRecovery: passwordRecoveryReducer,
    newPassword: setNewPasswordReducer,
    profile: profileReducer,
    registration: registrationReducer,
    packsList: packsListReducer,
})

export type AppStateType = ReturnType<typeof rootReducer>

type AppActionsType = actionsSetNewPasswordType
    | actionsLoginType
    | actionsPasswordRecoveryType
    | actionsProfileType
    | actionsRegistrationType
    | actionPacksListType

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType,
    AppStateType,
    unknown,
    AppActionsType>

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))