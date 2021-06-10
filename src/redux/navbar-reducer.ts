type NavItemType = {
    id: number
    navItem: string
    path: string
}

let initialState = {
    navbarItems: [
        {id: 1, navItem: "Profile", path: "/profile"},
        {id: 2, navItem: "Messages", path: "/dialogs"},
        {id: 3, navItem: "Users", path: "/users"},
        {id: 4, navItem: "News", path: "/news"},
        {id: 5, navItem: "Music", path: "/music"},
        {id: 6, navItem: "Settings", path: "/settings"},
        {id: 7, navItem: "Friends", path: "/friends"},
    ] as Array<NavItemType>
}

export type InitialStateType = typeof initialState

const navbarReducer = (state = initialState, action: any): InitialStateType => {
    return state
}

export default navbarReducer
