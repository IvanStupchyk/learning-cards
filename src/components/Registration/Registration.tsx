import React, {ChangeEvent, useState} from 'react';
import s from './Registration.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../state/redux-store";
import {setRegistrationTC} from "./registration-reducer";
import {Redirect} from 'react-router-dom';
import {InputContainer} from "../../common/InputContainer/InputContainer";
import {emailValidation} from "../../common/validation/EmailValidation";
import {passwordValidation} from "../../common/validation/passwordValidation";
import {HeaderEnterApp} from "../../common/HeaderEnterApp/HeaderEnterApp";
import {MainActionButton} from "../../common/BlueButton/MainActionButton";

export const Registration = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [checkPassword, setCheckPassword] = useState<string>('')

    const [error, setError] = useState<string>('')

    const [errorEmailMessage, setErrorEmailMessage] = useState<string>('')
    const [errorPasswordMessage, setErrorPasswordMessage] = useState<string>('')

    const disabledBtnSubmit = !email || !password || !checkPassword
    const isRegistration = useSelector<AppStateType, boolean>((state => state.registration.isRegistration))
    const dispatch = useDispatch()

    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setErrorEmailMessage('')
        setEmail(e.currentTarget.value)
    }

    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setErrorPasswordMessage('')
        setPassword(e.currentTarget.value)
    }

    const onChangeCheckPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setErrorPasswordMessage('')
        setCheckPassword(e.currentTarget.value)
    }

    const onRegistration = () => {
        if (!emailValidation(email)) {
            setErrorEmailMessage('Incorrect email')
        } else if (!passwordValidation(password)) {
            setErrorPasswordMessage('Minimum 8 characters')
        } else if (password !== checkPassword) {
            setErrorPasswordMessage('Enter correct password')
        } else {
            dispatch(setRegistrationTC(email, password))
        }
    }

    if (isRegistration) {
        return (
            <Redirect to={'/login'}/>
        )
    }

    const goBack = () => {
        window.history.go(-1);
    }

    return (
        <div className={s.registrationContainer}>
            <HeaderEnterApp title={'Sign Up'}/>
            <div className={s.inputFields}>
                <InputContainer
                    title={'Email'}
                    typeInput={'email'}
                    value={email}
                    changeValue={onChangeEmail}
                    errorMessage={errorEmailMessage}
                />
                <InputContainer
                    title={'password'}
                    typeInput={'password'}
                    value={password}
                    changeValue={onChangePassword}
                    errorMessage={errorPasswordMessage}
                />
                <InputContainer
                    title={'Confirm password'}
                    typeInput={'password'}
                    value={checkPassword}
                    changeValue={onChangeCheckPassword}
                    errorMessage={errorPasswordMessage}
                />
                <div className={s.errorContainer}>
                    {error && <div className={s.errorMessage}>{error}</div>}
                </div>
            </div>

            <div className={s.btns}>
                <a className={s.btnCancel} onClick={goBack}>Cancel</a>
                <div className={s.blueBtnContainer}>
                    <MainActionButton
                        actionClick={onRegistration}
                        disabledBtnSubmit={disabledBtnSubmit}
                        title={'Register'} />
                </div>
            </div>
        </div>
    )
}