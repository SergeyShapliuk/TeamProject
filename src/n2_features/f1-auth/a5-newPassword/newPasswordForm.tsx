import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {Navigate, useLocation, useParams} from "react-router-dom";
import regS from "../a2-register/RegisterForm.module.css";
import {useFridaySelector} from "../../../n1_main/m2-bll/store";
import {Redirect, RoutesXPaths} from "../../../n1_main/m1-ui/routes/routes";
import {newPasswordTC} from "../../../n1_main/m2-bll/r3-thunks/ThunksActionsRegisterAndRecoveryPassReducer";
import {Undetectable} from "../../../types/Undetectable";

const NewPasswordForm = () => {

    const dispatch = useDispatch()
    const isLoad = useFridaySelector<boolean>(state => state.app.isLoad)
    const newPassInfo = useFridaySelector<Undetectable<string>>(state => state.regForNewPass.newPassword.info)
    const isLoggedIn = useFridaySelector<boolean>(state => state.login.isLoggedIn)

    const [newPass, setNewPass] = useState<string>('')

    const {token} = useParams<'token'>()

    const create = () => {
        dispatch(newPasswordTC({
                password: newPass,
                resetPasswordToken: token
            })
        )
    }

    if (newPassInfo) {
        return <Navigate to={RoutesXPaths.LOGIN}/>
    }

    if (isLoggedIn) {
        return <Navigate to={RoutesXPaths.PROFILE}/>
    }


    return (

        <div className={regS.registerPage}>
            <div className={regS.title}>
                <h1>Cards</h1>
                <h4> Write new pass!</h4>
            </div>
            <div className={regS.second}>
                <input type="text" disabled={isLoad}
                       value={newPass}
                       onChange={(e) => setNewPass(e.currentTarget.value)}/>
                <div className={regS.buttonsDiv}>
                    <button onClick={create} disabled={isLoad}>Create</button>
                </div>
            </div>
        </div>


    )
}

export default NewPasswordForm;