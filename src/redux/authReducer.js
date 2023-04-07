import { authAPI } from "../API/authAPI";
import { authCaptchaAPI } from "../API/authCaptchaAPI";
import { loginAPI } from "../API/loginAPI";
import { logOutAPI } from "../API/logOutAPI";

const SET_USER_DATA = 'SET_USER_DATA'
const SET_LOGIN_DATA = 'SET_LOGIN_DATA'
const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE'

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
                isAuth: true
            }
        case SET_LOGIN_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        case SET_ERROR_MESSAGE:
            return {
                ...state,
                errorMessages:action.errorMessages
            }
        default:
            return state;
    }
}

export const authorization = () => {
    
    return (dispatch) => {
        return authAPI().then((response) => {
            if (response.data.resultCode === 0) {
                let { id, email, login } = response.data.data;
                console.log(response.data);
                dispatch(setAuthUserData(id, email, login));
            }
        });
    }
}
export const signIn = (data) => {
    return (dispatch) => {
        loginAPI(data).then((response) => {
            if (response.data.resultCode === 0) {
                let { id, email, login } = response.data.data;
                dispatch(setAuthUserData(id, email, login))
                dispatch(setErrorMessage(null))
            } else  {
                let message = response.data.messages 
                dispatch(setErrorMessage(message))   
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



export const setAuthUserData = (userId, email, login) => ({ type: SET_USER_DATA, data: { userId, email, login} })
export const setLoginData = (email, password, rememberMe) => ({ type: SET_LOGIN_DATA, data: { email, password, rememberMe } })
export const setErrorMessage = (message) => ({type: SET_ERROR_MESSAGE, errorMessages: message})




