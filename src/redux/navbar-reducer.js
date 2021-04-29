let initialState = {
	navbarItems: [
		{ id: 1, navItem: "Profile", path: "/profile" },
		{ id: 2, navItem: "Messages", path: "/dialogs" },
		{ id: 3, navItem: "Users", path: "/users" },
		{ id: 4, navItem: "News", path: "/news" },
		{ id: 5, navItem: "Music", path: "/music" },
		{ id: 6, navItem: "Settings", path: "/settings" },
		{ id: 7, navItem: "Friends", path: "/friends" },

	],
}

const navbarReducer = (state = initialState, action) => {
	return state
}

export default navbarReducer
