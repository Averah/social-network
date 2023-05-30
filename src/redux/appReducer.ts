import { authorization } from "./authReducer";
import { ThunkAction } from 'redux-thunk';
import { AppStateType } from "./redux-store";


const INITIALIZED_SUCCESS = 'social-network/app/INITIALIZED_SUCCESS'

export type InitialStateType = {
    initialized: boolean
}

let initialState: InitialStateType = {
    initialized: false
};

export type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

export type AppActionTypes = InitializedSuccessActionType

export const appReducer = (state = initialState, action: AppActionTypes):InitialStateType => {
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


type ThunkType = ThunkAction<void, AppStateType, unknown, AppActionTypes>

export const initialization = ():ThunkType => (dispatch) => {
        let promise = dispatch(authorization())
        promise.then( () => {
            dispatch(initializedSuccess())
        }) 
    }

export const initializedSuccess = ():InitializedSuccessActionType => ({ type: INITIALIZED_SUCCESS })




