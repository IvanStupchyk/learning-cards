import React, {ChangeEvent, useState} from "react";
import styles from './Password-recovery.module.scss'
import {NavLink, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {passwordRecoveryThunk} from "./password-recovery-reducer";
import {AppStateType} from "../../state/redux-store";

export const PasswordRecovery = () => {
    const [email, setEmail] = useState<string>("bovkunovichmarinacv@gmail.com")
    const [sendEmail, setSendEmail] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const [disabledButton, setDisabledButton] = useState<boolean>(true)
    const dispatch = useDispatch()
    const sendLetter = () => {
        dispatch(passwordRecoveryThunk(email))
        setSendEmail(true)
    }

    const inputEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value)
        if (validateEmail(event.currentTarget.value)) {
            setError("")
            setDisabledButton(false)
        }
    }

    const validateEmail = (email: string): boolean => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email)
    }

    const checkEmail = (email: string) => {
        if (validateEmail(email)) {
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

    const buttonClassName = disabledButton ? `${styles.disable}` : ''

    return (
        <div className={styles.container}>
            <div><h1 className={styles.header}>It-incubator</h1></div>
            <h2 className={styles.header}>Forgot your password?</h2>
            <div>
                <input type="email" placeholder="Email" onChange={inputEmail} onBlur={() => {checkEmail(email)}} />
                <div className={styles.error}><label>{error}</label></div>
            </div>
            <p className={styles.textAction}>Enter your email address and we will send you further instructions</p>
            <button className={buttonClassName} onClick={sendLetter}>Send Instructions</button>
            <p className={styles.textRememberPassword}>Did you remember your password?</p>
            <NavLink to="/login" activeClassName={styles.login}>Try logging in</NavLink>
        </div>
    )
}