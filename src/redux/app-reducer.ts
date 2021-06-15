import {getAuthUser} from "./auth-reducer"
import { InferActionsTypes } from "./redux-store"

let initialState = {
    initialized: false
}

export type InitialStateType = typeof initialState
export type ActionsType = InferActionsTypes<typeof actions>

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "sn/app/INITIALIZED_SUCCESS":
            return {
                ...state,
                initialized: true,
            }

        default:
            return state
    }
}

export const actions = {
    initializedSuccess: () => ({type: "sn/app/INITIALIZED_SUCCESS"} as const)
}

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUser())
    promise.then(() => {
        dispatch(actions.initializedSuccess())
    })
}

export default appReducer