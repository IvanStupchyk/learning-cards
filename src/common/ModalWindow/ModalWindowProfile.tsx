import React from "react";
import s from "./modalWindowProfile.module.scss";

type ModalWindowProfilePropsType = {
    onClick: () => void
    width: number
    height: number
}

export const ModalWindowProfile: React.FC<ModalWindowProfilePropsType> = (props) => {

    const {onClick, width, height, children}= props

       const closeModelWindow = () => {
        onClick()
    }

    const left = `calc(50vw - ${width / 2}px)`;

    const modalStyle = {
        left,
        width,
        height
    }

   return (
        <div className={s.profilePageContainer}>
            <>
                <div className={s.modalBackground} onClick={closeModelWindow}>
                </div>
                <div className={s.modalMessage} style={modalStyle}>
                    {children}
                </div>
            </>
        </div>
    )
}