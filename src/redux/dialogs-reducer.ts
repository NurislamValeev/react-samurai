const SEND_MESSAGE = "SEND-MESSAGE"

type DialogType = {
    id: number
    name: string
}
type MessageType = {
    id: number
    message: string
}

let initialState = {
    dialogs: [
        {id: 1, name: "Nurik"},
        {id: 2, name: "Bulat"},
        {id: 3, name: "Islam"},
        {id: 4, name: "Amir"},
        {id: 5, name: "Zaman"},
    ] as Array<DialogType>,

    messages: [
        {id: 1, message: "Hey"},
        {id: 2, message: "How is your learning React?"},
        {id: 3, message: "Do u want some pizza?"},
        {id: 4, message: "Do u want some pizza broo?"},
        {id: 5, message: "Go CS bro"},
    ] as Array<MessageType>
}

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {

        case SEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: action.message}],
            }

        default:
            return state
    }
}

type SendMessageCreatorActionType = {
    type: typeof SEND_MESSAGE
    message: string
}

export const sendMessageCreator = (message: string): SendMessageCreatorActionType => ({type: SEND_MESSAGE, message})

export default dialogsReducer
