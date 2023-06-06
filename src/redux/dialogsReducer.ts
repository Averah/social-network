import { InferActionsTypes } from './redux-store';

let initialState = {
    dialogs: [
        { id: 1, name: "Sasha" },
        { id: 2, name: "Anna" },
        { id: 3, name: "Kate" },
        { id: 4, name: "Max" },
        { id: 5, name: "Dasha" },
    ] as Array<DialogType>,
    messages: [
        { id: 1, message: "Hello" },
        { id: 2, message: "Its me" },
        { id: 3, message: "How is your day" },
    ] as Array<MessageType>,
}

type InitialStateType = typeof initialState
export type DialogType = {
    id: number
    name: string
}
export type MessageType = {
    id: number
    message: string
}

type ActionsTypes = ReturnType<InferActionsTypes<typeof actions>>

export const actions = {
    addDialogsMessageActionCreator: (dialogsMessage: string) => ({ type: 'sn/dialogs/ADD-DIALOGS-MESSAGE', dialogsMessage })
}

export const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {

        case 'sn/dialogs/ADD-DIALOGS-MESSAGE': {
            let newDialogMessage = {
                id: 4,
                message: action.dialogsMessage,
            }
            return {
                ...state,
                messages: [...state.messages, newDialogMessage],

            }

        }
        default:
            return state
    }
}

