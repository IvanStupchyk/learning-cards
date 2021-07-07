import React, {ChangeEvent, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../state/redux-store";
import s from "../Profile/PersonalIngormation.module.scss";
import {MainActionButton} from "../../common/MainActionButton/MainActionButton";
import {updateProfile} from "./profile-reducer";
import {InputContainer} from "../../common/InputContainer/InputContainer";
import {AuthUser} from "../Login/login-reducer";

type PersonalInformationPropsType = {
    onClick: () => void
    avatar: string
    name: string
}

export const PersonalInformation = React.memo((props: PersonalInformationPropsType) => {
    const loadingStatus = useSelector<AppStateType, boolean>(state => state.registration.loadingRequest)
    const isAuth = useSelector<AppStateType, boolean>(state => state.login.logIn)
    const dispatch = useDispatch()

    const [newName, setNewName] = useState<string>(props.name)
    const [urlAvatar, setUrlAvatar] = useState<string>(props.avatar)
    const [errorNickName, setErrorNickName] = useState<string>('')
    const [errorUrlAvatar, setErrorUrlAvatar] = useState<string>('')

    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setNewName(e.currentTarget.value)
    }

    const onChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
        setUrlAvatar(e.currentTarget.value)
    }

    const closeModelWindow = () => {
        props.onClick()
    }

    const disabledBtnSubmit = !newName || !urlAvatar

    const onSaveInformation = () => {
        if (!newName) {
            setErrorNickName('Incorrect nick name')
        } else if (!urlAvatar) {
            setErrorUrlAvatar('Incorrect url address')
        } else {
            dispatch(updateProfile(urlAvatar, newName));
            closeModelWindow();
        }
    }

    if (!isAuth) return <Redirect to={'/login'}/>

    return (
        <div className={s.profilePageContainer}>
            <>
                <div className={s.modalBackground} onClick={closeModelWindow}>
                </div>
                <div className={s.modalMessage}>
                    <div className={s.modalMessageContainer}>
                        <h2>Personal information</h2>
                        <img src={props.avatar && props.avatar ? props.avatar : ''} alt="user_photo"/>
                        <div className={s.inputFields}>
                            <InputContainer
                                title={'Nick name'}
                                typeInput={'text'}
                                value={newName}
                                changeValue={onChangeName}
                                errorMessage={errorNickName}
                            />
                            <InputContainer
                                title={'URL photo'}
                                typeInput={'text'}
                                value={urlAvatar}
                                changeValue={onChangeAvatar}
                                errorMessage={errorUrlAvatar}
                            />
                        </div>
                        <div className={s.btns}>
                            <a className={s.btnCancel} onClick={closeModelWindow}>Cancel</a>
                            <div className={s.blueBtnContainer}>
                                <MainActionButton
                                    actionClick={onSaveInformation}
                                    disabledBtnSubmit={disabledBtnSubmit}
                                    title={'Save'}
                                    loadingStatus={loadingStatus}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </div>
    )
})