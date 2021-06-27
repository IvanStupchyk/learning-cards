import React, {ChangeEvent, useState} from "react";
import st from './Login.module.scss'
import {useDispatch} from "react-redux";
import {loginUserTC} from "./login-reducer";

export const Login = () => {
    const [emailValue, setEmailValue] = useState<string>('')
    const [passwordValue, setPasswordValue] = useState<string>('')
    const dispatch = useDispatch()

    const changeEmailValue = (e: ChangeEvent<HTMLInputElement>) => {
        setEmailValue(e.currentTarget.value)
    }

    const changePasswordValue = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(e.currentTarget.value)
    }

    const checkLoginUser = () => {
        dispatch(loginUserTC(emailValue, passwordValue))
    }

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
                <a className={st.btnLogin} onClick={checkLoginUser}>Login</a>
                <a className={st.DifferentAccountBtn}>Don't have an account</a>
                <a className={st.signUpBtn}>Sing Up</a>
            </div>
        </div>
    )
}