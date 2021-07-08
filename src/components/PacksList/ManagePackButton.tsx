import React from "react";

type ManageButtonPropsType = {
    _id: string
    deletePackFun: (id: string) => void
}

export const ManagePacksButton: React.FC<ManageButtonPropsType> = (props) => {
    return (
        <>
            <td>
                <button id={props._id} onClick={() => props.deletePackFun(props._id)}>DELETE</button>
            </td>
            <td>
                <button id={props._id}>UPDATE</button>
            </td>
        </>
    )
}