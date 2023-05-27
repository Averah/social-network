import { authorization } from "./authReducer";

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

export const appReducer = (state = initialState, action: InitializedSuccessActionType):InitialStateType => {
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

export const initialization = () => (dispatch:any) => {
        let promise = dispatch(authorization())
        promise.then( () => {
            dispatch(initializedSuccess())
        }) 
    }

export const initializedSuccess = ():InitializedSuccessActionType => ({ type: INITIALIZED_SUCCESS })




