import React, {KeyboardEvent, useState} from 'react';
import s from './Profile.module.css'
import {useDispatch} from "react-redux";
import {useFridaySelector} from "../../../m2-bll/store";
import {updateUserNameTC} from "../../../m2-bll/r1-reducers/ProfileReducer";
import {UserDataType} from "../../../m2-bll/r2-actions/ActionLoginForm";
import {meRespType} from "../../../m3-dal/meAPI";
import {ChangeNameInput} from "./ChangeNameInput";
import {ProfileNameSpan} from "./ProfileNameSpan";
import {Navigate} from "react-router-dom";
import {RoutesXPaths} from "../../routes/routes";


export const BASE_IMG_URL = "https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Ukraine.svg"

const Profile = () => {
    const dispatch = useDispatch()

    const userInfo = useFridaySelector<UserDataType | meRespType>(state => state.profile.profile)
    const errorMessage = useFridaySelector<string>(state => state.profile.error)
    const globalError = useFridaySelector<string>(state => state.app.globalError)

    const [name, setName] = useState<string>(userInfo.name)
    const [error, setError] = useState<string>("")
    const [modification, setModification] = useState<boolean>(false)

    const changeModification = () => {
        setModification(true)
    }

    const updateUser = () => {
        if (name.trim() && name.length <= 20) {
            dispatch(updateUserNameTC(name))
            setModification(!modification)
            setError("")
        } else {
            setError("Incorrect name")
        }

    }

    const changeNameValue = (newName: string) => {
        setName(newName)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            dispatch(updateUserNameTC(name))
            setModification(!modification)
        }
    }
    if (globalError === "you are not authorized /ᐠ-ꞈ-ᐟ\\"){
        return  <Navigate to={RoutesXPaths.LOGIN}/>
    }

        return (
            <div className={s.profilePage}>
                <div className={s.profileContainer}>
                    <h2 className={s.title}>Personal information</h2>
                    <img src={userInfo.avatar ? userInfo.avatar : BASE_IMG_URL} alt={"user's image"}
                         title={"your avatar"}/>
                    <span>{`Cards: ${userInfo.publicCardPacksCount}`}</span>
                    <div className={s.nameContainer}>
                        {
                            !!errorMessage && <div className={s.errorMessage}>{errorMessage}</div>
                        }
                        {
                            modification
                                ? (
                                    <ChangeNameInput
                                        name={name}
                                        error={error}
                                        changeNameValue={changeNameValue}
                                        onKeyPressHandler={onKeyPressHandler}
                                        updateUser={updateUser}
                                    />
                                ) : (
                                    <ProfileNameSpan
                                        name={userInfo.name}
                                        changeModification={changeModification}
                                    />
                                )
                        }
                    </div>
                </div>
            </div>
        )
    }

    export default Profile