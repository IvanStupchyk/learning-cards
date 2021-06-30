import React, {ChangeEvent, FocusEvent, useState} from "react";
import st from './Password-recovery.module.scss'
import {NavLink, Redirect} from "react-router-dom";
import {useDispatch} from "react-redux";
import {passwordRecoveryThunk} from "./password-recovery-reducer";

import s from "../Login/Login.module.scss";
import {InputContainer} from "../../common/InputContainer/InputContainer";
import {emailValidation} from "../../common/validation/EmailValidation";
import {HeaderEnterApp} from "../../common/HeaderEnterApp/HeaderEnterApp";
import {BlueButton} from "../../common/BlueButton/BlueButton";

export const PasswordRecovery = () => {
    const [email, setEmail] = useState<string>('bovkunovichmarinacv@gmail.com')
    const [sendEmail, setSendEmail] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [disabledButton, setDisabledButton] = useState<boolean>(true)
    // const [emailValue, setEmailValue] = useState<string>('')
    const disabledBtnSubmit = !email
    const dispatch = useDispatch()
    const sendLetter = () => {
        dispatch(passwordRecoveryThunk(email))
        setSendEmail(true)
    }

    const inputEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value)
        if (emailValidation(event.currentTarget.value)) {
            setError("")
            setDisabledButton(false)
        }
    }

    const checkEmailOnBlur = (e: FocusEvent<HTMLInputElement>) => {
        if (emailValidation(e.currentTarget.value)) {
            setError("")
            setDisabledButton(false)
        } else {
            setError("Incorrect email")
            setDisabledButton(true)
        }
    }

    if (sendEmail) {
        return <Redirect to={`/password-recovery-check-email/${email}`} />
    }

    const buttonClassName = disabledButton ? `${st.disable}` : ''

    return (
        <div className={s.authPageContainer}>
            <HeaderEnterApp title={'Forgot your password?'}/>
            <InputContainer
                placeholder={'Email'}
                changeValue={inputEmail}
                errorMessage={error}
                typeInput={'email'}
                onBlur={checkEmailOnBlur}
                value={email}
            />
            <p className={st.textAction}>Enter your email address and we will send you further instructions</p>

            <BlueButton
                title={'Send Instructions'}
                actionClick={sendLetter}
                disabledBtnSubmit={disabledBtnSubmit}
                // loadingStatus={}
            />
            <button className={buttonClassName} onClick={sendLetter}>Send Instructions</button>
            <p className={st.textRememberPassword}>Did you remember your password?</p>
            <NavLink to="/login" activeClassName={st.login}>Try logging in</NavLink>
        </div>
    )
}