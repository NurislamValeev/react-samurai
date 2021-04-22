const ADD_POST = "ADD-POST"
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT"

let initialState = {
	posts: [
		{ id: 1, message: "Hello World!", likes: 12 },
		{ id: 2, message: "Learn React.", likes: 25 },
		{ id: 3, message: "Wanna eat some burgers.", likes: 9 },
		{ id: 4, message: "Progress.", likes: 15 },
	],
	newPostText: "",
}

const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_POST: {
			let newPost = {
				id: 5,
				message: state.newPostText,
				likes: 0,
			}

			return {
				...state,
				posts: [...state.posts, newPost],
				newPostText: "",
			}
		}
		case UPDATE_NEW_POST_TEXT: {
			return {
				...state,
				newPostText: action.newText,
			}
		}
		default:
			return state
	}
}

export const addPostActionCreator = () => ({ type: ADD_POST })
export const updateNewPostTextActionCreator = (text) => ({
	type: UPDATE_NEW_POST_TEXT,
	newText: text,
})

export default profileReducer
