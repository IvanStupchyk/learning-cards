import s from './PacksList.module.scss'
import {useDispatch, useSelector} from "react-redux";
import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import {addPack, deletePack, getPackList, setPageNumberAC} from "./packsList-reducer";
import {AppStateType} from "../../state/redux-store";
import {cardsPackType, getPacksAPIParamsType} from "../../api/api";
import {NavLink, Redirect} from "react-router-dom";
import {AuthUser} from "../Login/login-reducer";
import {Preloader} from "../../common/Preloader/Preloader";
import {Pagination} from "../../common/Pagination/Pagination";
import { ManagePacksButton } from './ManagePacksButton';

export const PacksList = () => {
    const isAuth = useSelector<AppStateType, boolean>(state => state.login.logIn)
    const user_id = useSelector<AppStateType, string>(state => state.login._id)
    const success = useSelector<AppStateType, boolean>(state => state.packsList.success)
    const [checkedPrivate, setCheckedPrivate] = useState<boolean>(false)
    const [title, setTitle] = useState<string>("")
    const [packName, setPackName] = useState<string>("pack")
    const [error, setError] = useState<string | null>(null)
    const dispatch = useDispatch();

    const {
        page = 1, pageCount = 10, min = 1, max = 10, sortPacks
    } = useSelector<AppStateType, getPacksAPIParamsType>(state => state.packsList.packsParams);

    const cardPacksTotalCount = useSelector<AppStateType, number>(state => state.packsList.cardPacksTotalCount);

    const packsList = useSelector<AppStateType, Array<cardsPackType>>(state => state.packsList.cardPacks)

    const onPageChangedHandler = useCallback((currentPage:number):void => {
        dispatch(setPageNumberAC(currentPage))
    },[page])

    useEffect(() => {
        if (!user_id) {
            dispatch(AuthUser())
        } else {
            dispatch(getPackList({pageCount,min,max,page,packName}))
        }
    }, [page, pageCount, sortPacks, min, max])


    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(null)
        setTitle(e.currentTarget.value)
    }

    const addPackFun = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            setCheckedPrivate(false)
            dispatch(addPack({cardsPack: {name: title, private: checkedPrivate}}))
        } else {
            setError("Title is required")
        }
        setTitle("")
    }

    const deletePackFun = (id: string) => {
        dispatch(deletePack({id}))
    }

    const getPrivatePacks = () => {
        setCheckedPrivate(!checkedPrivate)
        if(!checkedPrivate) {
            dispatch(getPackList({pageCount,min,max,page,packName,user_id}))
        } else {
            dispatch(getPackList({}))
        }
    }

    if (!isAuth) {
        return <Redirect to={'/login'}/>
    }

    // if (!packsList.length) {
    //     return <Preloader/>
    // }
    if (!success) {
        return <Preloader/>
    }

    return (
        <>
            <div className={s.flex}>
                <div className={s.private}>
                    <input type="checkbox" className="toggle_input" onChange={getPrivatePacks}/>
                    <label>private</label>
                </div>
                <table className={s.table}>
                    <tr className={s.tableRow}>
                        {/*{Object.keys(packsList[0]).map((key) => (*/}
                        {/*    <th>{key}</th>*/}
                        {/*))}*/}
                        <th className={s.tableHeader}>{"NAME"}</th>
                        <th className={s.tableHeader}>{"CARDS COUNT"}</th>
                        <th className={s.tableHeader}>{"USER NAME"}</th>
                        <th className={s.tableHeader}>{"UPDATED"}</th>
                        <th><input type={'text'} onChange={changeTitle}/></th>
                        <th>
                            <button onClick={addPackFun}>ADD</button>
                        </th>
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
                            <ManagePacksButton _id={pack._id} deletePackFun={deletePackFun}/>
                            <td><NavLink to={`/cards-list/${pack._id}`} activeClassName={s.activeLink}>cards list</NavLink>
                            </td>
                        </tr>
                    ))}
                </table>
                <Pagination totalItemsCount={cardPacksTotalCount}
                            pageSize={pageCount}
                            portionSize={10}
                            currentPage={page}
                            onPageChanged={onPageChangedHandler}
                />
            </div>

        </>
    )
}
