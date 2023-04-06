import { authAPI } from "../API/authAPI";
import { authCaptchaAPI } from "../API/authCaptchaAPI";
import { loginAPI } from "../API/loginAPI";
import { logOutAPI } from "../API/logOutAPI";

const SET_USER_DATA = 'SET_USER_DATA'
const SET_LOGIN_DATA = 'SET_LOGIN_DATA'

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    errorsMessage: null
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
                ...action.data,
                isAuth: true
            }
        default:
            return state;
    }
}

export const authorization = () => {
    return (dispatch) => {
        authAPI().then((response) => {
            if (response.data.resultCode === 0) {
                let { id, email, login, isAuth } = response.data.data;
                dispatch(setAuthUserData(id, email, login, isAuth));
            }
        });
    }
}
export const signIn = (data) => {

    return (dispatch) => {
        loginAPI(data).then((response) => {
            if (response.data.resultCode === 0) {
                let { id, email, login } = response.data.data;
                dispatch(setLoginData(id, email, login))
            }
        })
    }
}

export const logOut = () => {
    return (dispatch) => {
        logOutAPI().then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
        })
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
export const setLoginData = (email, password, rememberMe) => ({ type: SET_LOGIN_DATA, data: { email, password, rememberMe } })




