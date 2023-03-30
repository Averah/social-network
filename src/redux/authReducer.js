import { authAPI } from "../API/authAPI";

const SET_USER_DATA = 'SET_USER_DATA'


let initialState = {
    userId: null,
    email: null,
    login:null,
    isAuth: false
    
};

export const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true
            }

        default:
            return state;
    }
}

export const authorization = () =>{
return (dispatch) => {
    authAPI().then((response) => {
        if (response.data.resultCode === 0) {
          let { id, email, login } = response.data.data;
          dispatch(setAuthUserData(id, email, login));
        }
      });
}
}



export const setAuthUserData = (userId, email, login) => ({type: SET_USER_DATA, data: {userId, email, login} })



