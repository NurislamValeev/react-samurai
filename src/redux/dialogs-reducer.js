const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY"
const SEND_MESSAGE = "SEND-MESSAGE"

let initialState = {
	dialogs: [
		{ id: 1, name: "Nurik" },
		{ id: 2, name: "Bulat" },
		{ id: 3, name: "Islam" },
		{ id: 4, name: "Amir" },
		{ id: 5, name: "Zaman" },
	],

	messages: [
		{ id: 1, message: "Hey" },
		{ id: 2, message: "How is your learning React?" },
		{ id: 3, message: "Do u want some pizza?" },
		{ id: 4, message: "Do u want some pizza broo?" },
		{ id: 5, message: "Go CS bro" },
	],

	newMessageBody: "",
}

const dialogsReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_NEW_MESSAGE_BODY:
			state.newMessageBody = action.body
			return state
		case SEND_MESSAGE:
			let body = state.newMessageBody
			state.newMessageBody = ""
			state.messages.push({ id: 6, message: body })
			return state
		default:
			return state
	}
}

export const sendMessageCreator = () => ({ type: SEND_MESSAGE })
export const updateNewMessageBodyCreator = (body) => ({
	type: UPDATE_NEW_MESSAGE_BODY,
	body: body,
})

export default dialogsReducer
