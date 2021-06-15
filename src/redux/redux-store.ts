import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux"
import profileReducer from "./profile-reducer"
import dialogsReducer from "./dialogs-reducer"
import navbarReducer from "./navbar-reducer"
import usersReducer from "./users-reducer"
import authReducer from "./auth-reducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk"
import appReducer from "./app-reducer";

let RootReducer = combineReducers({
   profilePage: profileReducer,
   dialogsPage: dialogsReducer,
   navbar: navbarReducer,
   usersPage: usersReducer,
   auth: authReducer,
   app: appReducer
})

type RootReducerType = typeof RootReducer
export type AppStateType = ReturnType<RootReducerType>

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never
export type InferActionsTypes<T extends {[key: string]: (...args: any[])=>any}> = ReturnType<PropertiesTypes<T>>

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>


// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(RootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))
// @ts-ignore
window.store = store

export default store
