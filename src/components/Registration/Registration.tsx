import React, {ChangeEvent, useState} from 'react';
import s from './Registration.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../state/redux-store";
import {setRegistrationTC} from "./registration-reducer";
import {Redirect} from 'react-router-dom';

export const Registration = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [checkPassword, setCheckPassword] = useState<string>('')
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showCheckPassword, setShowCheckPassword] = useState<boolean>(false)
    const [error, setError] = useState<string | null>('')
    const isRegistration = useSelector<AppStateType, boolean>((state => state.registration.isRegistration))
    const dispatch = useDispatch()

    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setEmail(e.currentTarget.value)
    }

    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setPassword(e.currentTarget.value)
    }

    const onChangeCheckPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setCheckPassword(e.currentTarget.value)
    }

    const onRegistration = () => {
        if (email === '' || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            setError('Invalid email address')
        }
        if (password.length < 6 || password === '' || password !== checkPassword) {
            setError('Invalid password')
        }
        else {
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
        <div className={s.main}>
            <div className={s.registrationContainer}>
                <div className={s.logo}>It-incubator</div>
                <h1>Sign Up</h1>
                <div className={s.inputFields}>
                    <label>
                        <span className={s.inputName}>Email</span>
                        <input value={email} onChange={onChangeEmail} />
                    </label>
                    <div className={s.password}>
                        <label>
                            <span className={s.inputName}>Password</span>
                            <input value={password} onChange={onChangePassword} type={showPassword? 'text' : 'password'}/>
                            <img alt={'your password'} src={showPassword? 'https://snipp.ru/demo/495/no-view.svg' : 'https://snipp.ru/demo/495/view.svg'}
                                 className={s.passwordControl} onClick={()=>{setShowPassword(!showPassword)}}/>
                        </label>
                    </div>
                    <div className={s.password}>
                        <label>
                            <span className={s.inputName}>Confirm password</span>
                            <input value={checkPassword} onChange={onChangeCheckPassword} type={showCheckPassword? 'text' : 'password'}/>
                            <img alt={'your password'} src={showCheckPassword? 'https://snipp.ru/demo/495/no-view.svg' : 'https://snipp.ru/demo/495/view.svg'}
                                 className={s.passwordControl} onClick={()=>{setShowCheckPassword(!showCheckPassword)}}/>
                        </label>
                    </div>
                    <div className={s.errorContainer}>
                        {error && <div className={s.errorMessage}>{error}</div>}
                    </div>
                </div>

                <div className={s.btn}>
                    <a className={s.btnCancel} onClick={goBack}>Cancel</a>
                    <a className={s.btnRegister} onClick={onRegistration}>Register</a>
                </div>
            </div>
        </div>
    )
}