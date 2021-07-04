import s from './PacksList.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getPackList} from "./packsList-reducer";
import {AppStateType} from "../../state/redux-store";
import {cardsPackType} from "../../api/api";

export const PacksList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        debugger
        dispatch(getPackList)
    }, [])

    const packsList = useSelector<AppStateType, Array<cardsPackType>>(state => state.packsList)



    return (
        <table>
            <tr>
                {Object.keys(packsList[0]).map((key) => (
                    <th>{key}</th>
                ))}
            </tr>
            {packsList.map((pack) => (
                <tr key={pack._id}>
                    {Object.values(pack).map((val) => (
                        <td>{val}</td>
                    ))}
                </tr>
            ))}
        </table>
    )
}