import React, {ChangeEvent, useRef, useState} from "react";
import st from './Login.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {incorrectDataLogIn, loginUserTC} from "./login-reducer";
import {AppStateType} from "../../state/redux-store";
import {Preloader} from "../../common/Preloader/Preloader";
import {Redirect} from "react-router-dom";

export const Login = () => {
    const [emailValue, setEmailValue] = useState<string>('')
    const [passwordValue, setPasswordValue] = useState<string>('')

    const dispatch = useDispatch()
    const loadingStatus = useSelector<AppStateType, boolean>(state => state.login.loadingRequest)
    const isLogIn = useSelector<AppStateType, boolean>(state => state.login.logIn)
    const errorMessage = useSelector<AppStateType, null | string>(state => state.login.error)

    const emailTest = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailValue)
    const passwordTest = /[0-9a-zA-Z!@#$%^&*]{6,}/.test(passwordValue)
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
        if (!emailTest) {
            setErrorEmailMessage('Incorrect email')
        } else if (!passwordTest) {
            setErrorPasswordMessage('Minimum 6 characters')
        } else {
            dispatch(loginUserTC(emailValue, passwordValue))
        }
    }

    if (isLogIn) {
        return <Redirect to={'/profile'}/>
    }
    const disabledBtnSubmit = !emailValue || !passwordValue

    return (
        <div className={st.loginPageContainer}>
            <div className={st.logo}>It-incubator</div>
            <h1>Sign In</h1>

            <div className={st.emailPasswordContainer}>
                <label>
                    <span className={st.titleInput}>Email</span>
                    <input value={emailValue} onChange={changeEmailValue}/>
                    <span className={st.errorEmailPasswordMessage}>{errorEmailMessage}</span>
                </label>
                <label>
                    <span className={st.titleInput}>Password</span>
                    <input type={'password'} value={passwordValue} onChange={changePasswordValue}/>
                    <span className={st.errorEmailPasswordMessage}>{errorPasswordMessage}</span>
                </label>
                <div className={st.forgotPasswordBtn}>
                    <a onClick={() => {
                    }}>Forgot Password</a>
                </div>
            </div>

            <div className={st.btnFooterLoginContainer}>
                <span className={st.errorMessageContainer}>{errorMessage}</span>
                <button className={st.btnLogin} onClick={checkLoginUser}
                        disabled={loadingStatus || disabledBtnSubmit}>{loadingStatus ? <Preloader/> : 'login'}</button>
                <button className={st.DifferentAccountBtn}>Don't have an account</button>
                <button className={st.signUpBtn}>Sing Up</button>
            </div>
        </div>
    )
}

