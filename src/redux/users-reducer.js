import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/object-helpers";

const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET_USERS"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT"
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"
const TOGGLE_FOLLOWING_PROCESS = "TOGGLE_FOLLOWING_PROCESS"

let initialState = {
   users: [],
   pageSize: 100,
   totalUsersCount: 0,
   currentPage: 1,
   isFetching: true,
   followingProcess: []
}

const usersReducer = (state = initialState, action) => {

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

export const followSuccess = (userId) => ({type: FOLLOW, userId})
export const unfollowSuccess = (userId) => ({type: UNFOLLOW, userId,})
export const setUsers = (users) => ({type: SET_USERS, users})
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage})
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount})
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
export const toggleFollowingProcess = (isFetching, userId) => ({type: TOGGLE_FOLLOWING_PROCESS, isFetching, userId})

export const requestUsers = (page, pageSize) => {
   return async (dispatch) => {
      dispatch(setCurrentPage(page))
      dispatch(toggleIsFetching(true))

      let data = await usersAPI.getUsers(page, pageSize)
      dispatch(toggleIsFetching(false))
      dispatch(setUsers(data.items))
      dispatch(setTotalUsersCount(data.totalCount))
   }
}

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
   dispatch(toggleFollowingProcess(true, userId))
   let data = await apiMethod(userId)

   if (data.resultCode === 0) {
      dispatch(actionCreator(userId))
   }
   dispatch(toggleFollowingProcess(false, userId))
}

export const follow = (userId) => {
   return async (dispatch) => {
      followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess)
   }
}

export const unfollow = (userId) => {
   return async (dispatch) => {
      followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
   }
}

export default usersReducer

