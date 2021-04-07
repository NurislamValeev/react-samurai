const ADD_POST = "ADD-POST"
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT"
const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY"
const SEND_MESSAGE = "SEND-MESSAGE"

let store = {
	_state: {
		profilePage: {
			posts: [
				{ id: 1, message: "Hello World!", likes: 12 },
				{ id: 2, message: "Learn React.", likes: 25 },
				{ id: 3, message: "Wanna eat some burgers.", likes: 9 },
				{ id: 4, message: "Progress.", likes: 15 },
			],
			newPostText: "samsa",
		},
		dialogsPage: {
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
		},
		navbar: {
			navbarItems: [
				{ id: 1, navItem: "Profile", path: "/profile" },
				{ id: 2, navItem: "Messages", path: "/dialogs" },
				{ id: 3, navItem: "News", path: "/news" },
				{ id: 4, navItem: "Music", path: "/music" },
				{ id: 5, navItem: "Settings", path: "/settings" },
				{ id: 6, navItem: "Friends", path: "/friends" },
			],
		},
	},
	_callSubscriber() {
		console.log("State changed")
	},

	getState() {
		return this._state
	},
	subscribe(observer) {
		this._callSubscriber = observer
	},

	dispatch(action) {
		// { type: "ADD-POST" }
		if (action.type === ADD_POST) {
			let newPost = {
				id: 5,
				message: this._state.profilePage.newPostText,
				likes: 0,
			}

			this._state.profilePage.posts.push(newPost)
			this._state.profilePage.newPostText = ""
			this._callSubscriber(this._state)
		} else if (action.type === UPDATE_NEW_POST_TEXT) {
			this._state.profilePage.newPostText = action.newText
			this._callSubscriber(this._state)
		} else if (action.type === UPDATE_NEW_MESSAGE_BODY) {
			this._state.dialogsPage.newMessageBody = action.body
			this._callSubscriber(this._state)
		} else if (action.type === SEND_MESSAGE) {
			let body = this._state.dialogsPage.newMessageBody
			this._state.dialogsPage.newMessageBody = ""
			this._state.dialogsPage.messages.push({ id: 6, message: body })
			this._callSubscriber(this._state)
		}
	},
}

export const addPostActionCreator = () => ({ type: ADD_POST })
export const updateNewPostTextActionCreator = (text) => ({
	type: UPDATE_NEW_POST_TEXT,
	newText: text,
})

export const sendMessageCreator = () => ({ type: SEND_MESSAGE })
export const updateNewMessageBodyCreator = (body) => ({
	type: UPDATE_NEW_MESSAGE_BODY,
	body: body,
})

export default store
window.store = store
