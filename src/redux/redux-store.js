
import { createStore, combineReducers, applyMiddleware } from "redux";
import { authReducer } from "./authReducer";
import { counterReducer } from "./counterReducer";
import { dialogsReducer } from "./dialogsReducer";
import { profileReducer } from "./profileReducer";
import { sidebarReducer } from "./sidebarReducer";
import { usersReducer } from "./usersReducer";
import thunk from "redux-thunk"
import { appReducer } from "./appReducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    counter: counterReducer,
    app: appReducer
})

let store = createStore(reducers, applyMiddleware(thunk))

window.store = store

export default store