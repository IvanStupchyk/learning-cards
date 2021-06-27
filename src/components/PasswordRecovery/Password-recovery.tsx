import React from "react";
import styles from './Password-recovery.module.scss'
import {NavLink} from "react-router-dom";

export const PasswordRecovery = () => {
    return (
        <div className={styles.container}>
            <div><h1 className={styles.header}>It-incubator</h1></div>
            <h2 className={styles.header}>Forgot your password?</h2>
            <input type="email" placeholder={'Email'}/>
            <p className={styles.textAction}>Enter your email address and we will send you further instructions</p>
            <button>Send Instructions</button>
            <p className={styles.textRememberPassword}>Did you remember your password?</p>
            <NavLink to="/login" activeClassName={styles.login}>Try logging in</NavLink>
        </div>
    )
}