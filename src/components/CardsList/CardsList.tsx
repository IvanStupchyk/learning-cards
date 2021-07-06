import s from './CardsList.module.scss'
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {getCardsList} from "./cardsList-reducer";
import {AppStateType} from "../../state/redux-store";
import {cardType} from "../../api/api";
import {Redirect, useParams} from "react-router-dom";
import {AuthUser} from "../Login/login-reducer";
import {Preloader} from "../../common/Preloader/Preloader";

export const CardsList = () => {
    const isAuth = useSelector<AppStateType, boolean>(state => state.login.logIn)
    const idUser = useSelector<AppStateType, string>(state => state.login._id)
    const dispatch = useDispatch();
    const {id} = useParams<{ id: string }>()

    useEffect(() => {
        if (!idUser) {
            dispatch(AuthUser())
        } else {
            dispatch(getCardsList({cardPack_id: id}))
        }
    }, [dispatch])

    const cardsList = useSelector<AppStateType, Array<cardType>>(state => state.cardsList)

    if (!isAuth) return <Redirect to={'/login'}/>

    debugger
    if (!cardsList.length) {
        return <Preloader/>
    }

    return (
        <table>
            <tr>
                {Object.keys(cardsList[0]).map((key) => (
                    <th>{key}</th>
                ))}
                <th><button>ADD</button></th>
            </tr>
            {cardsList.map((card) => (
                <tr key={card._id}>
                    {Object.values(card).map((val) => (
                        <td>{val}</td>
                    ))}
                    <td><button>DELETE</button></td>
                    <td><button>UPDATE</button></td>
                </tr>
            ))}
        </table>
    )
}