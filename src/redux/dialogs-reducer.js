const SEND_MESSAGE = "SEND-MESSAGE"

let initialState = {
   dialogs: [
      {id: 1, name: "Nurik"},
      {id: 2, name: "Bulat"},
      {id: 3, name: "Islam"},
      {id: 4, name: "Amir"},
      {id: 5, name: "Zaman"},
   ],

   messages: [
      {id: 1, message: "Hey"},
      {id: 2, message: "How is your learning React?"},
      {id: 3, message: "Do u want some pizza?"},
      {id: 4, message: "Do u want some pizza broo?"},
      {id: 5, message: "Go CS bro"},
   ]
}

const dialogsReducer = (state = initialState, action) => {
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

export const sendMessageCreator = (message) => ({type: SEND_MESSAGE, message})

export default dialogsReducer
