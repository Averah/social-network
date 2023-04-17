import { authAPI } from "../API/authAPI";
import { authCaptchaAPI } from "../API/authCaptchaAPI";
import { loginAPI } from "../API/loginAPI";
import { logOutAPI } from "../API/logOutAPI";

const SET_USER_DATA = 'social-network/auth/SET_USER_DATA'
const SET_LOGIN_DATA = 'social-network/auth/SET_LOGIN_DATA'
const SET_ERROR_MESSAGE = 'social-network/auth/SET_ERROR_MESSAGE'

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    errorMessages: null
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
        let message = response.data.messages
        dispatch(setErrorMessage(message))
    }
}


export const logOut = () => async (dispatch) => {
    let response = await logOutAPI()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }

}

export const getCaptcha = () => {
    return (dispatch) => {
        authCaptchaAPI.then((response) => {

        }
        )
    }
}



export const setAuthUserData = (userId, email, login, isAuth) => ({ type: SET_USER_DATA, data: { userId, email, login, isAuth } })
export const setLoginData = (userId) => ({ type: SET_LOGIN_DATA, userId })
export const setErrorMessage = (message) => ({ type: SET_ERROR_MESSAGE, errorMessages: message })




