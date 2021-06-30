import s from "./InputContainer.module.scss";
import React, {ChangeEvent, FocusEvent} from "react";

type InputContainerPropsType = {
    title?: string
    value?: string
    changeValue: (e: ChangeEvent<HTMLInputElement>) => void,
    errorMessage: string
    typeInput: string
    placeholder?: string
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void
}
export const InputContainer = (props: InputContainerPropsType) => {
    return (
        <label className={s.emailPasswordContainer}>
            <span className={s.inputTitle}>{props.title}</span>
            <input
                type={props.typeInput}
                value={props.value}
                onChange={props.changeValue}
                placeholder={props.placeholder}
                onBlur={props.onBlur}
            />
            <span className={s.errorEmailPasswordMessage}>{props.errorMessage}</span>
        </label>
    )
}