import {authAPI} from "../api/api";

const SET_USER_DATA = "samurai-network/auth/SET_USER_DATA"
const SET_USER_PHOTO = "SET_USER_PHOTO"
const STOP_SUBMIT = "STOP_SUBMIT"

let initialState = {
   id: null,
   login: null,
   email: null,
   isFetching: false, // homework
   isAuth: false,
   photo: null,
   errorMessage: ""
}

const authReducer = (state = initialState, action) => {

   switch (action.type) {
      case SET_USER_DATA:
         return {
            ...state,
            ...action.payload
         }

      case SET_USER_PHOTO:
         return {
            ...state, photo: action.photo
         }

      case STOP_SUBMIT: {
         return {...state, errorMessage: action.errorMessage}
      }

      default:
         return state
   }
}

export const setAuthUserData = (id, email, login, isAuth) => ({
   type: SET_USER_DATA,
   payload: {id, email, login, isAuth}
})
export const setAuthUserPhoto = (photo) => ({type: SET_USER_PHOTO, photo})
export const stopSubmit = (errorMessage) => ({type: STOP_SUBMIT, errorMessage})


export const getAuthUser = () => async (dispatch) => {
   let response = await authAPI.getAuthUserData()
   if (response.resultCode === 0) {
      let {id, email, login} = response.data
      dispatch(setAuthUserData(id, email, login, true))

      let photo = await authAPI.getAuthUserPhoto(id)
      dispatch(setAuthUserPhoto(photo))
   }

}


export const login = (email, password, rememberMe) => {
   return async (dispatch) => {
      let response = await authAPI.login(email, password, rememberMe)
      if (response.resultCode === 0) {
         dispatch(getAuthUser())
      } else {
         // alert(response.messages)
         const errorMessage = await response.messages
         dispatch(stopSubmit(errorMessage))
         return Promise.reject(errorMessage)
      }
   }
}

export const logout = () => {
   return async (dispatch) => {
      let response = await authAPI.logout()
      if (response.resultCode === 0) {
         dispatch(setAuthUserData(null, null, null, false))
      }
   }
}

export default authReducer