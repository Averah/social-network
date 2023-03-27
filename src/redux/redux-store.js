
import { createStore, combineReducers, applyMiddleware } from "redux";
import { authReducer } from "./authReducer";
import { counterReducer } from "./counterReducer";
import { dialogsReducer } from "./dialogsReducer";
import { profileReducer } from "./profileReducer";
import { sidebarReducer } from "./sidebarReducer";
import { usersReducer } from "./usersReducer";
import thunk from "redux-thunk"

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    counter: counterReducer
})

let store = createStore(reducers, applyMiddleware(thunk))



export default store