import React, {ChangeEvent, useEffect, useState} from "react";
import styles from './Enter-new-password.module.scss'
import {useDispatch} from "react-redux";
import {Redirect, useParams} from "react-router-dom";
import {setNewPasswordThunk} from "./enter-new-password-reducer";
import noView from "../../media/password/no-view.svg"
import view from "../../media/password/view.svg"

export const EnterNewPassword = () => {
    const [password, setPassword] = useState<string>("")
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [savePassword, setSavePassword] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const [disabledButton, setDisabledButton] = useState<boolean>(true)
    const { token } = useParams<{token: string}>();
    const dispatch = useDispatch()
    const setNewPassword = () => {
        dispatch(setNewPasswordThunk(password, token))
        setSavePassword(true)
    }

    const inputPassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value)
        setError("")
        if (event.currentTarget.value.length <= 4) {
            setDisabledButton(true)
        } else {
            setDisabledButton(false)
        }
    }

    const validatePassword = (password: string) => {
        if (password.length <= 4) {
            setError("Password must be more than 4 characters.")
            setDisabledButton(true)
        }
    }

    if (savePassword) {
        return <Redirect to={"/login"}/>
    }

    const buttonClassName = disabledButton ? `${styles.disable}` : ''

    return (
        <div className={styles.container}>
            <div><h1 className={styles.header}>It-incubator</h1></div>
            <h2 className={styles.header}>Create new password</h2>
            <div className={styles.password}>
                <label>
                    <input onChange={inputPassword} onBlur={() => {validatePassword(password)}} type={showPassword? 'text' : 'password'}/>
                    <img alt={'your password'} src={showPassword? noView : view}
                         className={styles.passwordControl} onClick={()=>{setShowPassword(!showPassword)}}/>
                    <div className={styles.error}><label>{error}</label></div>
                </label>
            </div>
            <p className={styles.textAction}>Create new password and we will send you further instructions to email</p>
            <button className={buttonClassName} disabled={disabledButton} onClick={setNewPassword}>Create new password</button>
        </div>
    )
}

