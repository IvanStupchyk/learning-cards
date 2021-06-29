import React, {ChangeEvent, useState} from "react";
import st from './Login.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {loginUserTC} from "./login-reducer";
import {AppStateType} from "../../state/redux-store";
import {Preloader} from "../../common/Preloader/Preloader";

export const Login = () => {
    const [emailValue, setEmailValue] = useState<string>('')
    const [passwordValue, setPasswordValue] = useState<string>('')

    const dispatch = useDispatch()
    const loadingStatus = useSelector<AppStateType, boolean>(state => state.login.loadingRequest)

    const emailTest = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailValue)

    const changeEmailValue = (e: ChangeEvent<HTMLInputElement>) => {
        setEmailValue(e.currentTarget.value)
    }

    const changePasswordValue = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(e.currentTarget.value)
    }

    const checkLoginUser = () => {
        dispatch(loginUserTC(emailValue, passwordValue))
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
                </label>
                <label>
                    <span className={st.titleInput}>Password</span>
                    <input type={'password'} value={passwordValue} onChange={changePasswordValue}/>
                </label>
                <div className={st.forgotPasswordBtn}>
                    <a onClick={() => {}}>Forgot Password</a>
                </div>
            </div>

            <div className={st.btnFooterLoginContainer}>
                <button className={st.btnLogin} onClick={checkLoginUser} disabled={loadingStatus || disabledBtnSubmit}>{loadingStatus ? <Preloader /> : 'login'}</button>
                <button className={st.DifferentAccountBtn}>Don't have an account</button>
                <button className={st.signUpBtn}>Sing Up</button>
            </div>
        </div>
    )
}

