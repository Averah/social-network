
import { createStore, combineReducers, applyMiddleware, compose, AnyAction } from "redux";
import { authReducer } from './authReducer';
import { dialogsReducer } from './dialogsReducer';
import { profileReducer } from './profileReducer';
import { sidebarReducer } from "./sidebarReducer";
import { usersReducer } from './usersReducer';
import thunk, { ThunkDispatch } from "redux-thunk"
import { appReducer, } from './appReducer';
import { chatReducer } from './chatReducer';


let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    chat: chatReducer
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>
export type InferActionsTypes<T> = T extends { [key: string]: infer U } ? U : never
export type AppDispatch = typeof store.dispatch
export type TypedDispatch = ThunkDispatch<AppStateType, any, AnyAction>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)
  ));

// @ts-ignore
window.__store__ = store

export default store