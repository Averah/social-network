
import { authorization } from "./authReducer";

const INITIALIZED_SUCCESS = 'social-network/app/INITIALIZED_SUCCESS'

let initialState = {
    initialized: false
};

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        
        default:
            return state;
    }
}

export const initialization = () => (dispatch) => {
        let promise = dispatch(authorization())
        promise.then( () => {
            dispatch(initializedSuccess())
        }) 
    }

export const initializedSuccess = () => ({ type: INITIALIZED_SUCCESS })




