let initialState = {
	navbarItems: [
		{ id: 1, navItem: "Profile", path: "/profile" },
		{ id: 2, navItem: "Messages", path: "/dialogs" },
		{ id: 3, navItem: "News", path: "/news" },
		{ id: 4, navItem: "Music", path: "/music" },
		{ id: 5, navItem: "Settings", path: "/settings" },
		{ id: 6, navItem: "Friends", path: "/friends" },
	],
}

const navbarReducer = (state = initialState, action) => {
	return state
}

export default navbarReducer
