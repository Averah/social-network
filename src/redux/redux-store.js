import { createStore, combineReducers } from "redux";
import { dialogsReducer } from "./dialogsReducer";
import { usersReducer } from "./usersReducer";
import { profileReducer } from "./profileReducer";
import { sidebarReducer } from "./sidebarReducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
})

let store = createStore(reducers)



export default store