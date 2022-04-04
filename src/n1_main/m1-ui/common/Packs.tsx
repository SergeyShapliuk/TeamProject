import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";

import PacksList from "../../../n2_features/f2-packs&cards_YM/b1-packs/PacksList";
import {cardsActions} from "../../m2-bll/r2-actions/ActionsCards";
import {setGlobalErrorAC} from "../../m2-bll/r1-reducers/app-reducer";
import s from "./Packs.module.css"

const Packs = () => {
    const dispatch = useDispatch()
    //that useEffect fix one danger bug
    useEffect(() => {
        dispatch(cardsActions.cardModeAC(null))
        dispatch(setGlobalErrorAC(''))
    }, [])

    return (
        <div className={s.packs}>
            <PacksList/>
        </div>
    )
}

export default Packs