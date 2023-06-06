import { authorization } from "./authReducer";
import { ThunkAction } from 'redux-thunk';
import { AppStateType, InferActionsTypes } from './redux-store';

export type InitialStateType = {
    initialized: boolean
}

let initialState: InitialStateType = {
    initialized: false
};

type ActionsTypes = ReturnType<InferActionsTypes<typeof actions>>

export const actions = {
    initializedSuccess: () => ({ type: 'sn/app/INITIALIZED_SUCCESS' } as const)
}

export const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'sn/app/INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
            }

        default:
            return state;
    }
}

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>

export const initialization = (): ThunkType => (dispatch) => {
    let promise = dispatch(authorization())
    promise.then(() => {
        dispatch(actions.initializedSuccess())
    })
}





