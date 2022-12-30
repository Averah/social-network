const ADD_DIALOGS_MESSAGE = 'ADD-DIALOGS-MESSAGE'
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'

let initialState = {

    dialogs: [
        { id: 1, name: "Sasha" },
        { id: 2, name: "Anna" },
        { id: 3, name: "Kate" },
        { id: 4, name: "Max" },
        { id: 5, name: "Dasha" },
    ],

    messages: [
        { id: 1, message: "Hello" },
        { id: 2, message: "Its me" },
        { id: 3, message: "How is your day" },
    ],
    newMessageText: '',


}
export const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_DIALOGS_MESSAGE:{
            let newDialogMessage = {
                id: 4,
                message: state.newMessageText,
            }
            let stateCopy = {...state}
            stateCopy.messages = [...state.messages]
            stateCopy.messages.push(newDialogMessage)
            stateCopy.newMessageText = ''
            return stateCopy
        }
        case UPDATE_NEW_MESSAGE_TEXT:{
            let stateCopy = {...state}
            stateCopy.newMessageText = action.messageText
            return stateCopy
        }
        default:
            return state
    }
}


export const addDialogsMessageActionCreator = () => ({ type: ADD_DIALOGS_MESSAGE })
export const updateNewMessageTextActionCreator = (text) => ({ type: UPDATE_NEW_MESSAGE_TEXT, messageText: text })
