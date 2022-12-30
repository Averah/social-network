import { dialogsReducer } from "./dialogsReducer";
import { profileReducer } from "./profileReducer";
import { sidebarReducer } from "./sidebarReducer";


let store = {
    _state: {

        profilePage: {
            posts: [
                { id: 1, message: "Hey, it is me", likes: "10 likes" },
                { id: 2, message: "It is my new post", likes: "15 likes" },
                { id: 3, message: "It is my second post", likes: "20 likes" },],

            newPostText: ''
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
            newMessageText: '',

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
        
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.sidebar = sidebarReducer(this._state.sidebar, action)
        this._subscriber()
    }
}





export default store;