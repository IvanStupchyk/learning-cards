import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../state/redux-store";
import {AuthUser, logOutUser} from "../Login/login-reducer";

export const Profile = React.memo(() => {
    const isAuth = useSelector<AppStateType, boolean>(state => state.login.logIn)
    const idUser = useSelector<AppStateType, string>(state => state.login._id)
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
            Profile
            <button onClick={logOut} style={{height: '30px', width: '80px', backgroundColor: 'red'}}>log out</button>
        </div>
    )
})