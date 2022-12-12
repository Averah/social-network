
const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const ADD_DIALOGS_MESSAGE = 'ADD-DIALOGS-MESSAGE'
const UPDATE_NEW_DIALOGS_TEXT = 'UPDATE_NEW_DIALOGS_TEXT'

let store = {
    _state: {

        profilePage: {
            posts: [
                { id: 1, message: "Hey, it is me", likes: "10 likes" },
                { id: 2, message: "It is my new post", likes: "15 likes" },
                { id: 3, message: "It is my second post", likes: "20 likes" },],

            newPostText: 'hello'
        },

        dialogsPage: {
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
            newMessageText: 'New Message',
            
        },

        sidebar: {
            friends: [
                { id: 1, friend: 'Sasha' },
                { id: 2, friend: 'Anna' },
                { id: 3, friend: 'Kate' }
            ]
        }
    },

    getState() {
        return this._state
    },
    _subscriber() {
        console.log('hi');
    },

    subscribe(observer) {
        this._subscriber = observer
    },


    dispatch(action) {
        if (action.type === ADD_POST) {
            let newPost = {
                id: 4,
                message: this._state.profilePage.newPostText,
                likes: '0'
            }
            this._state.profilePage.posts.push(newPost)
            this._state.profilePage.newPostText = ''
            this._subscriber()
        } else if (action.type === UPDATE_NEW_POST_TEXT) {
            this._state.profilePage.newPostText = action.newText
            this._subscriber()
        } else if (action.type === ADD_DIALOGS_MESSAGE) {
            let newDialogMessage = {
                id: 4,
                message: this._state.dialogsPage.newMessageText,
            }
            this._state.dialogsPage.messages.push(newDialogMessage)
            this._state.dialogsPage.newMessageText = ''
            this._subscriber()
        } else if (action.type === UPDATE_NEW_DIALOGS_TEXT) {
            this._state.dialogsPage.newMessageText = action.messageText
            this._subscriber()
        }

    }
}


export const addPostActionCreator = () => ({ type: ADD_POST })
export const updateNewPostTextActionCreator = (text) =>
    ({ type: UPDATE_NEW_POST_TEXT, newText: text })
export const addDialogsMessageActionCreator = () => ({ type: ADD_DIALOGS_MESSAGE })
export const updateNewDialogsText = (text) => ({type:UPDATE_NEW_DIALOGS_TEXT, messageText:text})


export default store;