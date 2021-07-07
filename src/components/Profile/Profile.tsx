import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../state/redux-store";
import {AuthUser, logOutUser} from "../Login/login-reducer";
import s from "../Profile/Profile.module.scss";
import {PersonalInformation} from "./PersonalInformation";


export const Profile = React.memo(() => {

    const[editModeProfile, setEditModeProfile]= useState<boolean>(false)

    const isAuth = useSelector<AppStateType, boolean>(state => state.login.logIn)
    const idUser = useSelector<AppStateType, string>(state => state.login._id)
    const avatar = useSelector<AppStateType, string>(state => state.login.avatar)
    const name = useSelector<AppStateType, string>(state => state.login.name)
    const email = useSelector<AppStateType, string>(state => state.login.email)
    const publicCardPacksCount = useSelector<AppStateType, number>(state => state.login.publicCardPacksCount)
    const dispatch = useDispatch()

    const closeModelWindow= () => setEditModeProfile(false)

    useEffect(() => {
        if (!idUser) {
            dispatch(AuthUser())
        }
    }, [dispatch])

    const logOut = () => {
        dispatch(logOutUser())
    }

    if (!isAuth) return <Redirect to={'/login'}/>

    return (
        <div className={s.profilePageContainer}>
            <div className={s.profileContainer}>
                <div className={s.profileAboutYou}>
                    <img src={avatar && avatar ? avatar : ''} alt="user_photo"/>
                    <div>{name && name}</div>
                    <div>{email && email}</div>
                    <div>I am Front-end developer</div>
                    <div>public card packs count: {publicCardPacksCount && publicCardPacksCount}</div>
                    <div>
                    <button className={s.btnEdit} onClick={()=>setEditModeProfile(true)}>Edit profile</button>
                    <button className={s.btnLogout} onClick={logOut}>log out</button>
                    </div>
                </div>
                <div className={s.numberOfCards}>Number of cards</div>
            </div>
            <div className={s.profilePacksList}>
            </div>
            {editModeProfile && <PersonalInformation onClick={closeModelWindow}/>
            }
        </div>
    )
})