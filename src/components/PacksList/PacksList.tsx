import s from './PacksList.module.scss'
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {getPackList} from "./packsList-reducer";
import {AppStateType} from "../../state/redux-store";
import {cardsPackType} from "../../api/api";
import {NavLink, Redirect} from "react-router-dom";
import {AuthUser} from "../Login/login-reducer";
import {Preloader} from "../../common/Preloader/Preloader";

export const PacksList = () => {
    const isAuth = useSelector<AppStateType, boolean>(state => state.login.logIn)
    const idUser = useSelector<AppStateType, string>(state => state.login._id)
    const dispatch = useDispatch();

    useEffect(() => {
        if (!idUser) {
            dispatch(AuthUser())
        } else {
            dispatch(getPackList({}))
        }
    }, [dispatch])

    const packsList = useSelector<AppStateType, Array<cardsPackType>>(state => state.packsList)

    if (!isAuth) {
        return <Redirect to={'/login'}/>
    }

    if (!packsList.length) {
        return <Preloader/>
    }

    return (
        <table className={s.table}>
            <tr className={s.tableRow}>
                {/*{Object.keys(packsList[0]).map((key) => (*/}
                {/*    <th>{key}</th>*/}
                {/*))}*/}
                <th className={s.tableHeader}>{"NAME"}</th>
                <th className={s.tableHeader}>{"CARDS COUNT"}</th>
                <th className={s.tableHeader}>{"USER NAME"}</th>
                <th className={s.tableHeader}>{"UPDATED"}</th>
                <th><input type={'text'}/></th>
                <th><button>ADD</button></th>
            </tr>
            {packsList.map((pack) => (
                <tr key={pack._id} className={s.tableRow}>
                    {/*{Object.values(pack).map((val) => (*/}
                    {/*    <td style={{border: '1px solid black'}}>{val}</td>*/}
                    {/*))}*/}
                    <td className={s.tableCol}>{pack.name}</td>
                    <td className={s.tableCol}>{pack.cardsCount}</td>
                    <td className={s.tableCol}>{pack.user_name}</td>
                    <td className={s.tableCol}>{pack.updated}</td>
                    <td><button>DELETE</button></td>
                    <td><button>UPDATE</button></td>
                    <td><NavLink to={`/cards-list/${pack._id}`} activeClassName={s.activeLink}>cards list</NavLink></td>
                </tr>
            ))}
        </table>
    )
}