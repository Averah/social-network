import { ThunkAction } from 'redux-thunk';
import { AppStateType, InferActionsTypes } from './redux-store';

export type MessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

export type InitialStateType = {
    messages: MessageType[]
}

let initialState: InitialStateType = {
    messages: []
};

type ActionsTypes = ReturnType<InferActionsTypes<typeof actions>>

export const actions = {
    messagesReceived: () => ({ type: 'sn/chat/MESSAGES_RECEVIED', payload: {messages} } as const)
}

export const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'sn/chat/MESSAGES_RECEVIED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map( m => ({...m }))]
                    .filter((m, index, array) => index >= array.length - 100)
            }

        default:
            return state;
    }
}

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>







