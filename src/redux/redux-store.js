import {createStore, combineReducers} from "redux"
import profileReducer from "./profile-reducer"
import dialogsReducer from "./dialogs-reducer"
import navbarReducer from "./navbar-reducer"
import usersReducer from "./users-reducer"

let reducers = combineReducers({
   profilePage: profileReducer,
   dialogsPage: dialogsReducer,
   navbar: navbarReducer,
   usersPage: usersReducer,
})

let store = createStore(reducers)

window.store = store

export default store
