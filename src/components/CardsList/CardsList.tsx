import s from './CardsList.module.scss'
import {useDispatch, useSelector} from "react-redux";
import React, {ChangeEvent, useEffect, useState} from "react";
import {addCard, getCardsList} from "./cardsList-reducer";
import {AppStateType} from "../../state/redux-store";
import {cardType} from "../../api/api";
import {Redirect, useParams} from "react-router-dom";
import {AuthUser} from "../Login/login-reducer";
import {Preloader} from "../../common/Preloader/Preloader";
import {addPack} from "../PacksList/packsList-reducer";

export const CardsList = () => {
    const isAuth = useSelector<AppStateType, boolean>(state => state.login.logIn)
    const idUser = useSelector<AppStateType, string>(state => state.login._id)
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)
    const dispatch = useDispatch();
    const {id} = useParams<{ id: string }>()

    useEffect(() => {
        if (!idUser) {
            dispatch(AuthUser())
        } else {
            dispatch(getCardsList({cardPack_id: id}))
        }
    }, [dispatch, id])

    const cardsList = useSelector<AppStateType, Array<cardType>>(state => state.cardsList)

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(null)
        setTitle(e.currentTarget.value)
    }

    const addCardFun = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            dispatch(addCard({card: {cardsPack_id: id}}))
        } else {
            setError("Title is required")
        }
        setTitle("")
    }

    if (!isAuth) {
        return <Redirect to={'/login'}/>
    }

    // if (!cardsList.length) {
    //     return <Preloader/>
    // }

    return (
        <table className={s.table}>
            <tr className={s.tableRow}>
                {/*{Object.keys(cardsList[0]).map((key) => (*/}
                {/*    <th>{key}</th>*/}
                {/*))}*/}
                <th className={s.tableHeader}>{"QUESTION"}</th>
                <th className={s.tableHeader}>{"ANSWER"}</th>
                <th className={s.tableHeader}>{"GRADE"}</th>
                <th className={s.tableHeader}>{"UPDATED"}</th>
                <th><input type={'text'} onChange={changeTitle}/></th>
                <th>
                    <button onClick={addCardFun}>ADD</button>
                </th>
            </tr>
            {cardsList.map((card) => (
                <tr key={card._id} className={s.tableRow}>
                    {/*{Object.values(card).map((val) => (*/}
                    {/*    <td>{val}</td>*/}
                    {/*))}*/}
                    <td className={s.tableCol}>{card.question}</td>
                    <td className={s.tableCol}>{card.answer}</td>
                    <td className={s.tableCol}>{card.grade}</td>
                    <td className={s.tableCol}>{card.updated}</td>
                    <td>
                        <button>DELETE</button>
                    </td>
                    <td>
                        <button>UPDATE</button>
                    </td>
                </tr>
            ))}
        </table>
    )
}