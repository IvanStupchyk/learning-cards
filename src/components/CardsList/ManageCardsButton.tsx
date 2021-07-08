import React from "react";

type ManageButtonPropsType = {
    _id: string
    cardPack_id: string
    deleteCardFun: (id: string, cardPack_id: string) => void
}

export const ManageCardsButton: React.FC<ManageButtonPropsType> = (props) => {
    return (
        <>
            <td>
                <button id={props._id} onClick={() => props.deleteCardFun(props._id, props.cardPack_id)}>DELETE</button>
            </td>
            <td>
                <button id={props._id}>UPDATE</button>
            </td>
        </>
    )
}