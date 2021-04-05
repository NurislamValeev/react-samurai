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
			messages: [
				{ id: 1, message: "Hey" },
				{ id: 2, message: "How is your learning React?" },
				{ id: 3, message: "Do u want some pizza?" },
				{ id: 4, message: "Do u want some pizza broo?" },
				{ id: 5, message: "Do u want some money broo?" },
			],
			dialogs: [
				{ id: 1, name: "Nurik" },
				{ id: 2, name: "Bulat" },
				{ id: 3, name: "Islam" },
				{ id: 4, name: "Amir" },
				{ id: 5, name: "Zaman" },
			],
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

	getState() {
		return this._state
	},

	_callSubscriber() {
		console.log("State changed")
	},

	addPost() {
		let newPost = {
			id: 5,
			message: this._state.profilePage.newPostText,
			likes: 0,
		}

		this._state.profilePage.posts.push(newPost)
		this._state.profilePage.newPostText = ""
		this._callSubscriber(this._state)
	},

	updateNewPostText(newText) {
		this._state.profilePage.newPostText = newText
		this._callSubscriber(this._state)
	},

	subscribe(observer) {
		this._callSubscriber = observer
	},
}

export default store
window.store = store
