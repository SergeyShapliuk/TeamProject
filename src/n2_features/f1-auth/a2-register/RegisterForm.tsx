import React, {ChangeEvent, useState} from 'react';
import {registerUserTC, setErrorRegisterAC} from "./RegisterFormReducer";
import {useDispatch, useSelector} from "react-redux";
import {fridayReducerType} from "../../../n1_main/m2-bll/store";

const RegisterForm = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirm, setConfirm] = useState<string>('')
    const [confirmError, setConfirmError] = useState<string>('')

    debugger
    const dispatch = useDispatch()
    const error = useSelector<fridayReducerType, string | undefined>(state => state.registration.error)

    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }
    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }
    const onChangeConfirm = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirm(e.currentTarget.value)
    }
    const cancelHandler = () => {
        setEmail('')
        setPassword('')
        setConfirm('')
        setConfirmError('')
        dispatch(setErrorRegisterAC(''))
    }
    const registerHandler = () => {
        if (confirm.length !== password.length) {
            setConfirmError('Invalid password')
        } else {
            dispatch(registerUserTC({
                email: email,
                password: password,
            }))
        }
    }

    return (
        <div style={{
            border: '2px black solid',
            height: '60%',
            width: '20%',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '10px',
            justifyContent: 'space-around'
        }}>
            <div style={{textAlign: 'center'}}>
                <h1>Cards</h1>
                {!!error && <div>{error}</div>
                || !!confirmError && <div>{confirmError}</div>}
                <h4>Sing in</h4>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-around',
                height: '50%',
                width: '80%'
            }}>
                eMail
                <input type="text" value={email} onChange={onChangeEmail}/>
                Password
                <input type="password" value={password} onChange={onChangePassword}/>
                Confirm password
                <input type="password" value={confirm} onChange={onChangeConfirm}/>
            </div>
            <div style={{width: '80%', display: 'flex', justifyContent: 'space-around'}}>

                <button onClick={cancelHandler}>Cancel</button>
                <button onClick={registerHandler}>Register</button>
            </div>
        </div>
    );
};

export default RegisterForm;