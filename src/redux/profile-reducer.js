import {profileAPI, usersAPI} from "../api/api";

const SET_USER_PROFILE = "SET_USER_PROFILE"
const SET_STATUS = "SET_STATUS"
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS"
const STOP_SUBMIT = "STOP_SUBMIT"

let initialState = {
   profile: null,
   status: "",
   errorMessage: ""
}

const profileReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_USER_PROFILE: {
         return {...state, profile: action.profile}
      }

      case SET_STATUS: {
         return {...state, status: action.status}
      }

      case SAVE_PHOTO_SUCCESS: {
         return {...state, profile: {...state.profile, photos: action.photos}}
      }

      case STOP_SUBMIT: {
         return {...state, errorMessage: action.errorMessage}
      }

      default:
         return state
   }
}

export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status) => ({type: SET_STATUS, status})
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos})
export const stopSubmit = (errorMessage) => ({type: STOP_SUBMIT, errorMessage})

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

export const savePhoto = (file) => {
   return async (dispatch) => {
      let response = await profileAPI.savePhoto(file)
      if (response.data.resultCode === 0) {
         dispatch(savePhotoSuccess(response.data.data.photos))
      }
   }
}

export const saveProfile = (profile) => {
   return async (dispatch, getState) => {
      const userId = getState().auth.id
      const response = await profileAPI.saveProfile(profile)

      if (response.data.resultCode === 0) {
         dispatch(getUserProfileThunk(userId))
      } else {
         const errorMessage = await response.data.messages[0]
         dispatch(stopSubmit(errorMessage))
         return Promise.reject(errorMessage)
      }
   }
}

export default profileReducer
