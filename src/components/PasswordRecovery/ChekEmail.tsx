import React from "react";
import styles from './Password-recovery.module.scss'
import checkEmail from '../../media/password/checkEmail.svg'
import {useParams} from "react-router-dom";

export const CheckEmail = () => {
    const { email } = useParams<{email: string}>();
    return (
        <div className={styles.containerCheckEmail}>
            <div><h1 className={styles.header}>It-incubator</h1></div>
            <img src={checkEmail} alt="Check email"/>
            <h2 className={styles.header}>Check Email</h2>
            <p className={styles.textActionCheckEmail}>We’ve sent an Email with instructions to {email}</p>
        </div>
    )
}