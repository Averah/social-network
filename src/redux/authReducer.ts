import { authAPI, ResultCodesEnum } from '../API/authAPI';
import { loginAPI, ResultCodeForCaptchaEnum } from '../API/loginAPI';
import { logOutAPI } from "../API/logOutAPI";
import { securityAPI } from "../API/securityAPI";
import { ThunkAction } from 'redux-thunk';
import { AppStateType, InferActionsTypes } from './redux-store';

let initialState = {
    userId: null as null | number,
    email: null as null | string,
    login: null as null | string,
    isAuth: false,
    errorMessages: null as null | Array<string>,
    captchaURL: null as null | string | undefined,
}

export type InitialStateType = typeof initialState

export type SetUserDataActionDataType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaURL?: string | null | undefined
}
export type LoginDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

type ActionsTypes = ReturnType<InferActionsTypes<typeof actions>>

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean, captchaURL?: string | null | undefined) =>
        ({ type: 'sn/auth/SET_USER_DATA', data: { userId, email, login, isAuth, captchaURL } } as const),
    setLoginData: (userId: number) => ({ type: 'sn/auth/SET_LOGIN_DATA', userId } as const),
    setErrorMessage: (message: string[] | null) => ({ type: 'sn/auth/SET_ERROR_MESSAGE', errorMessages: message } as const),
    setCaptchaURL: (captchaURL: string) => ({ type: 'sn/auth/SET_CAPTCHA_URL', captchaURL } as const),
}

export const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'sn/auth/SET_USER_DATA':
            return {
                ...state,
                ...action.data,
            }
        case 'sn/auth/SET_LOGIN_DATA':
            return {
                ...state,
                userId: action.userId,
                isAuth: true
            }
        case 'sn/auth/SET_ERROR_MESSAGE':
            return {
                ...state,
                errorMessages: action.errorMessages
            }
        case 'sn/auth/SET_CAPTCHA_URL':
            return {
                ...state,
                captchaURL: action.captchaURL

            }
        default:
            return state;
    }
}


export type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>


export const authorization = (): ThunkType => async (dispatch) => {
    const data = await authAPI()
    if (data.resultCode === ResultCodesEnum.Success) {
        const { id, email, login } = data.data;
        dispatch(actions.setAuthUserData(id, email, login, true, null));
    }

}

export const signIn = (data: LoginDataType): ThunkType => async (dispatch) => {
    const response = await loginAPI(data)
    if (response.resultCode === ResultCodesEnum.Success) {
        const userId = response.data.userId;
        dispatch(actions.setLoginData(userId))
        dispatch(actions.setErrorMessage(null))
    } else {
        if (response.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
            dispatch(getCaptchaURL())
        }
        const message = response.messages
        dispatch(actions.setErrorMessage(message))
    }
}


export const logOut = (): ThunkType => async (dispatch) => {
    const data = await logOutAPI()
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }

}

export const getCaptchaURL = (): ThunkType => async (dispatch) => {
    const data = await securityAPI.getCaptchaURL()
    const captchaURL = data.url
    dispatch(actions.setCaptchaURL(captchaURL))
}




