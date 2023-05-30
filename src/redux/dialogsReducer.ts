
const ADD_DIALOGS_MESSAGE = 'social-network/dialogs/ADD-DIALOGS-MESSAGE'

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

export type AddDialogsMessageActionType = {
    type: typeof ADD_DIALOGS_MESSAGE
    dialogsMessage: string
}


export type DialogsActionTypes = AddDialogsMessageActionType


export const dialogsReducer = (state = initialState, action: DialogsActionTypes): InitialStateType => {
    switch (action.type) {

        case ADD_DIALOGS_MESSAGE: {
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


export const addDialogsMessageActionCreator = (dialogsMessage: string): AddDialogsMessageActionType => ({ type: ADD_DIALOGS_MESSAGE, dialogsMessage })
