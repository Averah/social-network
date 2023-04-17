import { addDialogsMessageActionCreator, dialogsReducer } from "./dialogsReducer"


let state = {
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
}

it('messages length should be 4', () => {
    let action = addDialogsMessageActionCreator('lol')
    let newState = dialogsReducer(state, action)
    expect(newState.messages.length).toBe(4)

})

