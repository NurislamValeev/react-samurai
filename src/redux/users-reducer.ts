import {usersAPI} from "../api/api";
import {UserType} from "../types/types";
import {updateObjectInArray} from "../utils/object-helpers";

const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET_USERS"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT"
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"
const TOGGLE_FOLLOWING_PROCESS = "TOGGLE_FOLLOWING_PROCESS"

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingProcess: [] as Array<number> // array of users id
}

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }

        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }

        case SET_USERS:
            return {...state, users: action.users}

        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}

        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.count}

        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}

        case TOGGLE_FOLLOWING_PROCESS:
            return {
                ...state,
                followingProcess:
                    action.isFetching
                        ? [...state.followingProcess, action.userId]
                        : state.followingProcess.filter(id => id !== action.userId)
            }

        default:
            return state
    }
}
export type FollowSuccessActionType = {
    type: typeof FOLLOW
    userId: number
}
export const followSuccess = (userId: number): FollowSuccessActionType => ({type: FOLLOW, userId})

export type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({type: UNFOLLOW, userId,})

export type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({type: SET_USERS, users})

export type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number)
    : SetCurrentPageActionType => ({type: SET_CURRENT_PAGE, currentPage})

export type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    count: number
}
export const setTotalUsersCount = (totalUsersCount: number)
    : SetTotalUsersCountActionType => ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount})

export type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean)
    : ToggleIsFetchingActionType => ({type: TOGGLE_IS_FETCHING, isFetching})

export type ToggleFollowingProcessActionType = {
    type: typeof TOGGLE_FOLLOWING_PROCESS
    isFetching: boolean
    userId: number
}
export const toggleFollowingProcess = (isFetching: boolean, userId: number)
    : ToggleFollowingProcessActionType => ({
    type: TOGGLE_FOLLOWING_PROCESS,
    isFetching,
    userId
})

export const requestUsers = (page: number, pageSize: number) => {
    return async (dispatch: any) => {
        dispatch(setCurrentPage(page))
        dispatch(toggleIsFetching(true))

        let data = await usersAPI.getUsers(page, pageSize)
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(data.items))
        dispatch(setTotalUsersCount(data.totalCount))
    }
}

const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: any) => {
    dispatch(toggleFollowingProcess(true, userId))
    let data = await apiMethod(userId)

    if (data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProcess(false, userId))
}

export const follow = (userId: number) => {
    return async (dispatch: any) => {
        await followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess)
    }
}

export const unfollow = (userId: number) => {
    return async (dispatch: any) => {
        await followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
    }
}

export default usersReducer

