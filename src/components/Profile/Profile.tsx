import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../state/redux-store";
import {AuthUser, logOutUser} from "../Login/login-reducer";


export const Profile = React.memo(() => {
    const isAuth = useSelector<AppStateType, boolean>(state => state.login.logIn)
    const idUser = useSelector<AppStateType, string>(state => state.login._id)
    const avatar = useSelector<AppStateType, string>(state => state.login.avatar)
    const name = useSelector<AppStateType, string>(state => state.login.name)
    const email = useSelector<AppStateType, string>(state => state.login.email)
    const publicCardPacksCount = useSelector<AppStateType, number>(state => state.login.publicCardPacksCount)
    const dispatch = useDispatch()

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
        <div>
            <div>
                <div>
                    <img src={avatar && avatar ? avatar : ''} alt="user_photo"/>
                    <div>{name && name}</div>
                    <div>{email && email}</div>
                    <div>{publicCardPacksCount && publicCardPacksCount}</div>
                </div>
                <div>Number of cards</div>
            </div>
            <div>
                <button onClick={logOut} style={{height: '30px', width: '80px', backgroundColor: 'red'}}>log out
                </button>
            </div>
        </div>
    )
})