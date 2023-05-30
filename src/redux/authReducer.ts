import { authAPI, ResultCodesEnum } from '../API/authAPI';
import { loginAPI, ResultCodeForCaptchaEnum } from '../API/loginAPI';
import { logOutAPI } from "../API/logOutAPI";
import { securityAPI } from "../API/securityAPI";
import { ThunkAction } from 'redux-thunk';
import { AppStateType } from "./redux-store";


const SET_USER_DATA = 'social-network/auth/SET_USER_DATA'
const SET_LOGIN_DATA = 'social-network/auth/SET_LOGIN_DATA'
const SET_ERROR_MESSAGE = 'social-network/auth/SET_ERROR_MESSAGE'
const SET_CAPTCHA_URL = 'social-network/auth/SET_CAPTCHA_URL'


let initialState = {
    userId: null as null | number,
    email: null as null | string,
    login: null as null | string,
    isAuth: false,
    errorMessages: null as null | Array<string>,
    captchaURL: null as null | string,
}

export type InitialStateType = typeof initialState

export type SetUserDataActionDataType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaURL?: string | null
}

export type LoginDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

export type AuthActionTypes = SetUserDataActionType | SetLoginDataActionType | SetErrorMessageActionType | SetCaptchaURLActionType

export const authReducer = (state = initialState, action: AuthActionTypes): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
            }
        case SET_LOGIN_DATA:
            return {
                ...state,
                userId: action.userId,
                isAuth: true
            }
        case SET_ERROR_MESSAGE:
            return {
                ...state,
                errorMessages: action.errorMessages
            }
        case SET_CAPTCHA_URL:
            return {
                ...state,
                captchaURL: action.captchaURL

            }
        default:
            return state;
    }
}


export type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, AuthActionTypes>


export const authorization = (): ThunkType => async (dispatch) => {
    const data = await authAPI()
    if (data.resultCode === ResultCodesEnum.Success) {
        const { id, email, login } = data.data;
        dispatch(setAuthUserData(id, email, login, true, null));
    }

}

export const signIn = (data: LoginDataType): ThunkType => async (dispatch) => {
    const response = await loginAPI(data)
    if (response.resultCode === ResultCodesEnum.Success) {
        const userId = response.data.userId;
        dispatch(setLoginData(userId))
        dispatch(setErrorMessage(null))
    } else {
        if (response.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
            dispatch(getCaptchaURL())
        }
        const message = response.messages
        dispatch(setErrorMessage(message))
    }
}


export const logOut = (): ThunkType => async (dispatch) => {
    const data = await logOutAPI()
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(setAuthUserData(null, null, null, false))
    }

}

export const getCaptchaURL = (): ThunkType => async (dispatch) => {
    const data = await securityAPI.getCaptchaURL()
    const captchaURL = data.url
    dispatch(setCaptchaURL(captchaURL))
}



export type SetUserDataActionType = {
    type: typeof SET_USER_DATA
    data: SetUserDataActionDataType
}
export type SetLoginDataActionType = {
    type: typeof SET_LOGIN_DATA
    userId: number
}

export type SetErrorMessageActionType = {
    type: typeof SET_ERROR_MESSAGE
    errorMessages: string[] | null

}

export type SetCaptchaURLActionType = {
    type: typeof SET_CAPTCHA_URL
    captchaURL: string
}



export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean, captchaURL?: string | null): SetUserDataActionType =>
    ({ type: SET_USER_DATA, data: { userId, email, login, isAuth, captchaURL } })
export const setLoginData = (userId: number): SetLoginDataActionType => ({ type: SET_LOGIN_DATA, userId })
export const setErrorMessage = (message: string[] | null): SetErrorMessageActionType => ({ type: SET_ERROR_MESSAGE, errorMessages: message })
export const setCaptchaURL = (captchaURL: string): SetCaptchaURLActionType => ({ type: SET_CAPTCHA_URL, captchaURL })




