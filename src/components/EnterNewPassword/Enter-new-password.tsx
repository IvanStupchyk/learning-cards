import React, {ChangeEvent, useState} from "react";
import styles from './Enter-new-password.module.scss'
import {useDispatch} from "react-redux";
import { useParams } from "react-router-dom";
import {setNewPasswordThunk} from "./enter-new-password-reducer";

export const EnterNewPassword = () => {
    const [password, setPassword] = useState<string>("")
    const { token } = useParams<{token: string}>();
    debugger
    const dispatch = useDispatch()
    const setNewPassword = () => {
        dispatch(setNewPasswordThunk(password, token))
    }

    const inputPassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value)
    }
    return (
        <div className={styles.container}>
            <div><h1 className={styles.header}>It-incubator</h1></div>
            <h2 className={styles.header}>Create new password</h2>
            <input type="password" placeholder={'Password'} onChange={inputPassword} />
            <p className={styles.textAction}>Create new password and we will send you further instructions to email</p>
            <button onClick={setNewPassword}>Create new password</button>
        </div>
    )
}

