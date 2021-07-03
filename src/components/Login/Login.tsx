import React, {ChangeEvent, useState} from "react";
import s from './Login.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {incorrectDataLogIn, loginUserTC} from "./login-reducer";
import {AppStateType} from "../../state/redux-store";
import {NavLink, Redirect} from "react-router-dom";
import {InputContainer} from "../../common/InputContainer/InputContainer";
import {emailValidation} from "../../common/validation/EmailValidation";
import {HeaderEnterApp} from "../../common/HeaderEnterApp/HeaderEnterApp";
import {MainActionButton} from "../../common/BlueButton/MainActionButton";
import {passwordValidation} from "../../common/validation/passwordValidation";

export const Login = () => {
    const [emailValue, setEmailValue] = useState<string>('')
    const [passwordValue, setPasswordValue] = useState<string>('')

    const dispatch = useDispatch()
    const loadingStatus = useSelector<AppStateType, boolean>(state => state.login.loadingRequest)
    const isLogIn = useSelector<AppStateType, boolean>(state => state.login.logIn)
    const errorMessage = useSelector<AppStateType, null | string>(state => state.login.error)

    const [errorEmailMessage, setErrorEmailMessage] = useState<string>('')
    const [errorPasswordMessage, setErrorPasswordMessage] = useState<string>('')

    const changeEmailValue = (e: ChangeEvent<HTMLInputElement>) => {
        setEmailValue(e.currentTarget.value)
        setErrorEmailMessage('')
        errorMessage && dispatch(incorrectDataLogIn(''))
    }
    const changePasswordValue = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(e.currentTarget.value)
        errorMessage && dispatch(incorrectDataLogIn(''))
        setErrorPasswordMessage('')
    }

    const checkLoginUser = () => {
        if (!emailValidation(emailValue)) {
            setErrorEmailMessage('Incorrect email')
        } else if (!passwordValidation(passwordValue)) {
            setErrorPasswordMessage('Minimum 8 characters')
        } else {
            dispatch(loginUserTC(emailValue, passwordValue))
        }
    }

    if (isLogIn) {
        return <Redirect to={'/profile'}/>
    }
    const disabledBtnSubmit = !emailValue || !passwordValue

    return (
        <div className={s.authPageContainer}>
            <HeaderEnterApp title={'Sign In'}/>

            <div className={s.emailPasswordLoginContainer}>
                <InputContainer
                    title={'Email'}
                    typeInput={'email'}
                    value={emailValue}
                    changeValue={changeEmailValue}
                    errorMessage={errorEmailMessage}
                />
                <InputContainer
                    title={'Password'}
                    typeInput={'password'}
                    value={passwordValue}
                    changeValue={changePasswordValue}
                    errorMessage={errorPasswordMessage}
                />

                <div className={s.forgotPasswordBtn}>
                    <NavLink to="/password-recovery">Forgot Password</NavLink>
                </div>
            </div>

            <div className={s.btnFooterLoginContainer}>
                <span className={s.errorMessageContainer}>{errorMessage}</span>
                <div className={s.blueBtnContainer}>
                    <MainActionButton actionClick={checkLoginUser}
                                disabledBtnSubmit={disabledBtnSubmit}
                                loadingStatus={loadingStatus}
                                title={'login'}
                    />
                </div>
                <p className={s.DifferentAccountBtn}>Don't have an account</p>
                <NavLink to="/registration" className={s.footerBtn}>Sing Up</NavLink>
            </div>
        </div>
    )
}

