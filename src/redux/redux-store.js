
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { authReducer } from "./authReducer.ts";
import { counterReducer } from "./counterReducer";
import { dialogsReducer } from "./dialogsReducer.ts";
import { profileReducer } from "./profileReducer.ts";
import { sidebarReducer } from "./sidebarReducer.ts";
import { usersReducer } from "./usersReducer.ts";
import thunk from "redux-thunk"
import { appReducer } from "./appReducer.ts";



let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    counter: counterReducer,
    app: appReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)
  ));



window.__store__ = store

export default store