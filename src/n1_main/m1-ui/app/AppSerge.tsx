import React, {useEffect} from 'react';
import './App.css';
import {useDispatch} from "react-redux";
import {useFridaySelector} from "../../m2-bll/store";
import {RequestStatusType} from "../../m2-bll/r1-reducers/app-reducer";
import Preloader from "../common/preloader/Preloader";
import Main from "../../Main";
import RoutesX from "../routes/routes";
import {meTC} from "../../m2-bll/r3-thunks/ThunkMe";

const AppSerge = () => {

    const dispatch = useDispatch()

    const status = useFridaySelector<RequestStatusType>(state => state.app.status)
    const initialized = useFridaySelector<boolean>(state => state.me.isInitialized)
    const isLoginIn = useFridaySelector<boolean>(state => state.login.isLoggedIn)

    useEffect(() => {
        dispatch(meTC())
    }, [])

    return (
        <div className="App">
            {isLoginIn? <Main/>:null}
            <RoutesX/>
            <Preloader status={status}/>
        </div>
    )
}

export default AppSerge
