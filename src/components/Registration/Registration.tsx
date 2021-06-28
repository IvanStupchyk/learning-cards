import React from 'react';
import s from './Registration.module.scss'

export const Registration = () => {
    return (
        <div className={s.registrationContainer}>
            <div className={s.logo}>It-incubator</div>
            <h1>Sign Up</h1>
            <div className={s.inputFields}>
                <label>
                    <span className={s.inputName}>Email</span>
                    <input/>
                </label>
                <label>
                    <span className={s.inputName}>Password</span>
                    <input type={'password'}/>
                    <a href='#' className={s.passwordControl}/>
                </label>
                <label>
                    <span className={s.inputName}>Confirm password</span>
                    <input type={'password'}/>
                </label>
            </div>
            <div className={s.btn}>
                <a className={s.btnCancel}>Cancel</a>
                <a className={s.btnRegister}>Register</a>
            </div>
        </div>
    )
}