import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import s from "./LearnedCard.module.css"
import {useFridaySelector} from "../../../n1_main/m2-bll/store";
import {cardsTC} from "../../../n1_main/m2-bll/r3-thunks/ThunkCards";
import {RequestStatusType} from "../../../n1_main/m2-bll/r1-reducers/app-reducer";
import Preloader from "../../../n1_main/m1-ui/common/preloader/Preloader";
import {LearnedCard} from "./LearnedCard";

const LearnedCardContainer = () => {

    const dispatch = useDispatch()

    const appStatus = useFridaySelector<RequestStatusType>(state => state.app.status)

    const {packId} = useParams<'packId'>()

    useEffect(() => {
        if (packId) {
            dispatch(cardsTC(packId))
        }
    }, [])

    if (appStatus === 'loading') {
        return <Preloader status={appStatus}/>
    }

    return (
        <div className={s.learnCardBlock}>
            <LearnedCard/>
        </div>
    )
}

export default LearnedCardContainer
