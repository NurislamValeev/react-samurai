import {usersAPI} from "../api/api";

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
            users: state.users.map((u) => {
               if (u.id === action.userId) {
                  return {...u, followed: true}
               } else {
                  return u
               }
            }),
         }

      case UNFOLLOW:
         return {
            ...state,
            users: state.users.map((u) => {
               if (u.id === action.userId) {
                  return {...u, followed: false}
               } else {
                  return u
               }
            }),
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

export const getUsers = (currentPage, pageSize) => {
   return (dispatch) => {
      dispatch(setCurrentPage(currentPage))
      dispatch(toggleIsFetching(true))

      usersAPI.getUsers(currentPage, pageSize).then(data => {
         dispatch(toggleIsFetching(false))
         dispatch(setUsers(data.items))
         dispatch(setTotalUsersCount(data.totalCount))
      })
   }
}

export const follow = (userId) => {
   return (dispatch) => {
      dispatch(toggleFollowingProcess(true, userId))
      usersAPI.followUser(userId)
         .then(data => {
            if (data.resultCode === 0) {
               dispatch(followSuccess(userId))
            }
            dispatch(toggleFollowingProcess(false, userId))
         })
   }
}

export const unfollow = (userId) => {
   return (dispatch) => {
      dispatch(toggleFollowingProcess(true, userId))
      usersAPI.unfollowUser(userId)
         .then(data => {
            if (data.resultCode === 0) {
               dispatch(unfollowSuccess(userId))
            }
            dispatch(toggleFollowingProcess(false, userId))
         })
   }
}

export default usersReducer

