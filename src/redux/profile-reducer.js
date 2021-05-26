import {profileAPI, usersAPI} from "../api/api";

const SET_USER_PROFILE = "SET_USER_PROFILE"
const SET_STATUS = "SET_STATUS"

let initialState = {
   profile: null,
   status: ""
}

const profileReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_USER_PROFILE: {
         return {...state, profile: action.profile}
      }

      case SET_STATUS: {
         return {...state, status: action.status}
      }

      default:
         return state
   }
}

export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status) => ({type: SET_STATUS, status})

export const getUserProfileThunk = (userId) => {
   return async (dispatch) => {
      const response = await usersAPI.getUserProfile(userId)
      dispatch(setUserProfile(response))
   }
}

export const getStatus = (userId) => {
   return async (dispatch) => {
      let response = await profileAPI.getStatus(userId)
      dispatch(setStatus(response))
   }
}

export const updateStatus = (status) => {
   return async (dispatch) => {
      let response = await profileAPI.updateStatus(status)
      if (response.data.resultCode === 0) {
         dispatch(setStatus(status))
      }
   }
}

export default profileReducer
