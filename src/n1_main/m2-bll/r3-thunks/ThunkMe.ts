import {Dispatch} from "redux";
import {setAppStatusAC, setGlobalErrorAC, setIsLoadAC} from "../r1-reducers/app-reducer";
import {meAPI} from "../../m3-dal/meAPI";
import {ProfileActions} from "../r1-reducers/ProfileReducer";
import {initializeMeAC} from "../r2-actions/ActionsMe";
import {LoginFormActions} from "../r2-actions/ActionLoginForm";

export const meTC = () => async (dispatch: Dispatch) => {

    dispatch(setAppStatusAC("loading"))
    dispatch(setIsLoadAC(true))
    try {
        let res = await meAPI.me()
        dispatch(ProfileActions.setProfileAC(res.data))
        dispatch(LoginFormActions.setIsLoggedInAC(true))
        dispatch(setAppStatusAC("succeeded"))
    } catch (e: any) {
        dispatch(setGlobalErrorAC(e.response? e.response.data.error : 'some error'))
        dispatch(setAppStatusAC("failed"))
    }
    finally {
        dispatch(initializeMeAC(true))
        dispatch(setAppStatusAC("idle"))
        dispatch(setIsLoadAC(false))
    }
}