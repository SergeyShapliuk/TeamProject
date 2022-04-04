import React from "react";
import preloader from "../../assets/preloader/preloader.gif"
import {RequestStatusType} from "../../../m2-bll/r1-reducers/app-reducer";
import s from "./Preloader.module.css"

type PreloaderType = {
    status: RequestStatusType
}

const Preloader = ({status}: PreloaderType) => {
    return (
        <div className={s.preloader}>
            {
                status === "loading" &&
                <img
                    src={preloader}
                    alt='preloader'
                />
            }
        </div>
    )
}

export default Preloader
