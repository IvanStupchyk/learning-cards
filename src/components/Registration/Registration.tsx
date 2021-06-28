import React, {ChangeEvent, useState} from 'react';
import s from './Registration.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../state/redux-store";
import {setRegistrationTC} from "./registration-reducer";
import { Redirect } from 'react-router-dom';

export const Registration = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [checkPassword, setCheckPassword] = useState<string>('')
    const isRegistration = useSelector<AppStateType, boolean>((state => state.registration.isRegistration))
    const dispatch = useDispatch()

    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }

    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }

    const onChangeCheckPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setCheckPassword(e.currentTarget.value)
    }

    const onRegistration=()=>{
        if(email === '' || password === ''){
            alert('Field is required')
        }
        if (password !== checkPassword){
            alert('wrong password')
        }
        else {
            dispatch(setRegistrationTC(email, password))
            setEmail('')
            setPassword('')
            setCheckPassword('')
        }
    }

    if(isRegistration){
        return  (
            <Redirect to={'/login'}/>
        )
    }

    return (
        <div className={s.registrationContainer}>
            <div className={s.logo}>It-incubator</div>
            <h1>Sign Up</h1>
            <div className={s.inputFields}>
                <label>
                    <span className={s.inputName}>Email</span>
                    <input value={email} onChange={onChangeEmail} placeholder={'Enter email...'}/>
                </label>
                <label>
                    <span className={s.inputName}>Password</span>
                    <input value={password} onChange={onChangePassword} type={'password'}
                           placeholder={'Enter password...'}/>
                </label>
                <label>
                    <span className={s.inputName}>Confirm password</span>
                    <input value={checkPassword} onChange={onChangeCheckPassword} type={'password'}
                           placeholder={'Confirm password...'}/>
                </label>
            </div>
            <div className={s.btn}>
                <a className={s.btnCancel}>Cancel</a>
                <a className={s.btnRegister} onClick={onRegistration}>Register</a>
            </div>
        </div>
    )
}