import s from "./BlueButton.module.scss";
import {Preloader} from "../Preloader/Preloader";
import React from "react";

type BlueButton = {
    actionClick: () => void
    loadingStatus?: boolean
    disabledBtnSubmit: boolean
    title: string
}

export const BlueButton = (props: BlueButton) => {
    return (
        <button className={s.blueBtn} onClick={props.actionClick}
                disabled={props.loadingStatus || props.disabledBtnSubmit}>{props.loadingStatus ? <Preloader/> : props.title}</button>
    )
}