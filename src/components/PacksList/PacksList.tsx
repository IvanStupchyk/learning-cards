import s from './PacksList.module.scss'
import {useDispatch, useSelector} from "react-redux";
import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import {addPack, deletePack, getPackList, setPackNameAC, setPageNumberAC} from "./packsList-reducer";
import {AppStateType} from "../../state/redux-store";
import {cardsPackType, getPacksAPIParamsType} from "../../api/api";
import {NavLink, Redirect} from "react-router-dom";
import {AuthUser} from "../Login/login-reducer";
import {Preloader} from "../../common/Preloader/Preloader";
import {Pagination} from "../../common/Pagination/Pagination";
import {ManagePacksButton} from './ManagePacksButton';

export const PacksList = () => {
    const isAuth = useSelector<AppStateType, boolean>(state => state.login.logIn)
    const idUser = useSelector<AppStateType, string>(state => state.profile.profile._id)
    const success = useSelector<AppStateType, boolean>(state => state.packsList.success)
    const [checkedPrivate, setCheckedPrivate] = useState<boolean>(false)
    const [title, setTitle] = useState<string>("")
    const [packNameTitle, setPackNameTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)
    const [showModal, setShowModal] = useState<boolean>(false)
    const dispatch = useDispatch();

    const {
        page = 1, pageCount = 10, min = 1, max = 10, packName, sortPacks
    } = useSelector<AppStateType, getPacksAPIParamsType>(state => state.packsList.packsParams);

    const cardPacksTotalCount = useSelector<AppStateType, number>(state => state.packsList.cardPacksTotalCount);

    const packsList = useSelector<AppStateType, Array<cardsPackType>>(state => state.packsList.cardPacks)

    const onPageChangedHandler = useCallback((currentPage: number): void => {
        dispatch(setPageNumberAC(currentPage))
    }, [page])

    useEffect(() => {
        if (!idUser) {
            dispatch(AuthUser())
        } else {
            dispatch(getPackList({pageCount, min, max, page, packName}))
        }
    }, [dispatch, page, pageCount, sortPacks, min, max, packName])


    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(null)
        setTitle(e.currentTarget.value)
    }

    const addPackFun = () => {
        console.log(1)
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            setCheckedPrivate(false)
            dispatch(addPack({cardsPack: {name: title}}))
        } else {
            setError("Title is required")
        }
        setTitle("")
        setShowModal(false)
    }

    const changeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(null)
        setPackNameTitle(e.currentTarget.value)
    }

    const setSearch = () => {
        const trimmedSearch = packNameTitle.trim()
        if (trimmedSearch) {
            dispatch(setPackNameAC(trimmedSearch))
            // getPrivatePacks() ARBUZ <3
        } else {
            setError("Title is required")
        }
        setPackNameTitle("")
    }

    const deletePackFun = (id: string) => {
        dispatch(deletePack({id}))
    }

    const getPrivatePacks = () => {
        setCheckedPrivate(prev => !prev)
        if (!checkedPrivate) {
            debugger
            dispatch(getPackList({pageCount, min, max, page, packName, user_id: idUser}))
        } else {
            dispatch(getPackList({pageCount, min, max, page, packName}))
        }
    }

    if (!isAuth) {
        return <Redirect to={'/login'}/>
    }

    if (!success) {
        return <Preloader/>
    }

    const finalModal = showModal ? `${s.modalWindowAdd} ${s.visibilityWindow}` : `${s.modalWindowAdd}`
    const finalBackgroundModal = showModal ? `${s.backgroundModal} ${s.visibilityWindow}` : `${s.backgroundModal}`

    return (
        <>
            <div className={s.flex}>
                <div className={s.private}>
                    <input type="checkbox" className="toggle_input" onChange={getPrivatePacks}
                           checked={checkedPrivate}/>
                    <label>private</label>
                </div>
                <div className={s.search}>
                    <div className={s.containerInputSearch}>
                        <input type={'text'} onChange={changeSearch} value={packNameTitle}/>
                        <button onClick={() => {
                            dispatch(setPackNameAC(''))
                        }}>X
                        </button>
                    </div>
                    <button onClick={setSearch}>SEARCH</button>
                </div>
                <table className={s.table}>
                    <tr className={s.tableRow}>
                        <th className={s.tableHeader}>{"NAME"}</th>
                        <th className={s.tableHeader}>{"CARDS COUNT"}</th>
                        <th className={s.tableHeader}>{"USER NAME"}</th>
                        <th className={s.tableHeader}>{"UPDATED"}</th>
                        <th>
                            <input type={'text'} value={title} onChange={changeTitle} />
                            <button onClick={addPackFun}>ADD</button>
                            {/*<button onClick={() => setShowModal(true)}>ADD</button>*/}
                        </th>
                    </tr>
                    {packsList.map((pack) => (
                        <tr key={pack._id} className={s.tableRow}>
                            <td className={s.tableCol}>{pack.name}</td>
                            <td className={s.tableCol}>{pack.cardsCount}</td>
                            <td className={s.tableCol}>{pack.user_name}</td>
                            <td className={s.tableCol}>{pack.updated}</td>
                            <td className={s.tableCol}>{pack.user_id}</td>
                            {(checkedPrivate && success) && <ManagePacksButton _id={pack._id} deletePackFun={deletePackFun}/>}
                            <td><NavLink to={`/cards-list/${pack._id}`} activeClassName={s.activeLink}>cards
                                list</NavLink>
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
            <div className={finalBackgroundModal} onClick={() => setShowModal(false)}></div>
            <div className={finalModal} onBlur={() => setShowModal(false)}>
                <button className={s.closeModalAdd} onClick={() => setShowModal(false)}>X</button>
                <input className={s.inputModalAdd} type={'text'} value={title} onChange={changeTitle} />
                <button className={s.addModalAdd} onClick={addPackFun}>ADD</button>
            </div>
        </>
    )
}
