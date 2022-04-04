import React from 'react';
import {useDispatch} from "react-redux";
import {useFridaySelector} from "../../../n1_main/m2-bll/store";
import regS from './RegisterForm.module.css'
import {useFormik} from "formik";
import {Navigate, NavLink} from 'react-router-dom'
import {RoutesXPaths} from "../../../n1_main/m1-ui/routes/routes";
import {registerUserTC} from "../../../n1_main/m2-bll/r3-thunks/ThunksActionsRegisterAndRecoveryPassReducer";
import {registerAndRecoveryPassActions} from "../../../n1_main/m2-bll/r2-actions/ActionsRegisterAndRecoveryPassReducer";
import {Undetectable} from "../../../types/Undetectable";
import PasswordView from "../../../n1_main/m1-ui/view-password/PasswordView";

type FormikErrorType = {
    email?: string
    password?: string
    confirm?: string
}

const RegisterForm = () => {

    const dispatch = useDispatch()
    const isLoad = useFridaySelector<boolean>(state => state.app.isLoad)
    const error = useFridaySelector<Undetectable<string>>(state => state.regForNewPass.register.error)
    const isLoggedIn = useFridaySelector<boolean>(state => state.login.isLoggedIn)
    const isVisible = useFridaySelector<boolean>(state => state.app.isVisible)
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirm: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i) {
                errors.email = 'Invalid email address'
            }
            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 7) {
                errors.password = 'Invalid password,pass will be longer that  symbols'
            }
            if (!values.confirm) {
                errors.confirm = 'Required'
            } else if (values.confirm.length !== values.password.length && values.confirm !== values.password) {
                errors.confirm = 'Invalid confirm password'
            }
            return errors
        },
        onSubmit: value => {
            formik.resetForm()
            dispatch(registerUserTC({email: value.email, password: value.password}))
        }
    })

    const cancelHandler = () => {
        formik.resetForm()
        formik.setTouched({})
        formik.setErrors({email: undefined, password: undefined, confirm: undefined})
        dispatch(registerAndRecoveryPassActions.setErrorRegisterAC(""))
    }

    if (error === "email already exists /ᐠ｡ꞈ｡ᐟ\\") {
        return <Navigate to={RoutesXPaths.LOGIN}/>
    }

    if (isLoggedIn) {
        return <Navigate to={RoutesXPaths.PROFILE}/>
    }

    return (
        <div className={regS.registerPage}>
            <div className={regS.registerContainer}>
                <div className={regS.titles}>
                    <h1>Cards</h1>
                    {!!error && <div>{error}</div>}
                    <h4>Sing in</h4>
                </div>

                <div className={regS.registerForm}>
                    <form onSubmit={formik.handleSubmit}>
                        <div className={regS.second}>
                            eMail
                            <input disabled={isLoad} {...formik.getFieldProps('email')}/>
                            {formik.touched.email && formik.errors.email ?
                                <div className={regS.errorMessage}>{formik.errors.email}</div> : null}
                        </div>
                        <div className={regS.second}>
                            Password
                            <input    type={isVisible ? "text" : "password"}
                                   {...formik.getFieldProps('password')}/>

                            {formik.touched.password && formik.errors.password ?
                                <div className={regS.errorMessage}>{formik.errors.password}</div> : null}
                           <div className={regS.icon}>
                               <PasswordView isVisible={isVisible}/>
                           </div>
                        </div>
                        <div className={regS.second}>
                            Confirm password
                            <input    type={isVisible ? "text" : "password"}
                                   {...formik.getFieldProps('confirm')}/>
                            {formik.touched.confirm && formik.errors.confirm ?
                                <div className={regS.errorMessage}>{formik.errors.confirm}</div> : null}
                            <div className={regS.icon}>
                                <PasswordView isVisible={isVisible}/>
                            </div>
                        </div>
                        <div className={regS.buttonsDiv}>
                            <button type="button" className={regS.cancelButton} disabled={isLoad} onClick={cancelHandler}>
                                <NavLink to={RoutesXPaths.LOGIN}>
                                    Cancel
                                </NavLink></button>
                            <button type="submit" className={regS.registerButton} disabled={isLoad}>Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterForm