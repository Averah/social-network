import { createStore, combineReducers } from "redux";
import { dialogsReducer } from "./dialogsReducer";
import { profileReducer } from "./profileReducer";
import { sidebarReducer } from "./sidebarReducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
})

let store = createStore(reducers)



export default store