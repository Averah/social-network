import { authAPI } from "../API/authAPI";

import { loginAPI } from "../API/loginAPI";
import { logOutAPI } from "../API/logOutAPI";
import { securityAPI } from "../API/securityAPI";

const SET_USER_DATA = 'social-network/auth/SET_USER_DATA'
const SET_LOGIN_DATA = 'social-network/auth/SET_LOGIN_DATA'
const SET_ERROR_MESSAGE = 'social-network/auth/SET_ERROR_MESSAGE'
const SET_CAPTCHA_URL = 'social-network/auth/SET_CAPTCHA_URL'

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    errorMessages: null,
    captchaURL: null
};

export const authReducer = (state = initialState, action) => {
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

export const authorization = () => async (dispatch) => {
    let response = await authAPI()
    if (response.data.resultCode === 0) {
        let { id, email, login } = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
    ;
}

export const signIn = (data) => async (dispatch) => {
    let response = await loginAPI(data)
    if (response.data.resultCode === 0) {
        let userId = response.data.data.userId;
        dispatch(setLoginData(userId))
        dispatch(setErrorMessage(null))
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaURL())
        }

        let message = response.data.messages
        dispatch(setErrorMessage(message))
    }
}


export const logOut = () => async (dispatch) => {
    let response = await logOutAPI()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false, null))
    }

}

export const getCaptchaURL = () => async (dispatch) => {
    const response = await securityAPI.getCaptchaURL()
    const captchaURL = response.data.url
    dispatch(setCaptchaURL(captchaURL))
}



export const setAuthUserData = (userId, email, login, isAuth, captchaURL) =>
    ({ type: SET_USER_DATA, data: { userId, email, login, isAuth, captchaURL } })
export const setLoginData = (userId) => ({ type: SET_LOGIN_DATA, userId })
export const setErrorMessage = (message) => ({ type: SET_ERROR_MESSAGE, errorMessages: message })
export const setCaptchaURL = (captchaURL) => ({ type: SET_CAPTCHA_URL, captchaURL })




