import React, {ChangeEvent, useState} from "react";
import styles from './Password-recovery.module.scss'
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {passwordRecoveryThunk} from "./password-recovery-reducer";

export const PasswordRecovery = () => {
    const [email, setEmail] = useState<string>("bovkunovichmarinacv@gmail.com")
    const dispatch = useDispatch()
    const sendLetter = (email: string) => {
        dispatch(passwordRecoveryThunk(email))
    }

    const inputEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value)
    }

    return (
        <div className={styles.container}>
            <div><h1 className={styles.header}>It-incubator</h1></div>
            <h2 className={styles.header}>Forgot your password?</h2>
            <input type="email" placeholder={'Email'} onChange={inputEmail}/>
            <p className={styles.textAction}>Enter your email address and we will send you further instructions</p>
            <button onClick={() => {sendLetter(email)}}>Send Instructions</button>
            <p className={styles.textRememberPassword}>Did you remember your password?</p>
            <NavLink to="/login" activeClassName={styles.login}>Try logging in</NavLink>
        </div>
    )
}