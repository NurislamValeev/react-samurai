import {authAPI, securityAPI} from "../api/api";

const SET_USER_DATA = "samurai-network/auth/SET_USER_DATA"
const GET_CAPTCHA_URL_SUCCESS = "samurai-network/auth/GET_CAPTCHA_URL_SUCCESS"
const SET_USER_PHOTO = "samurai-network/auth/SET_USER_PHOTO"
const STOP_SUBMIT = "samurai-network/auth/STOP_SUBMIT"

let initialState = {
   id: null,
   login: null,
   email: null,
   isFetching: false, // homework
   isAuth: false,
   photo: null,
   errorMessage: null,
   captchaUrl: null
}

const authReducer = (state = initialState, action) => {

   switch (action.type) {
      case SET_USER_DATA:
      case GET_CAPTCHA_URL_SUCCESS:
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

export const getCaptchaUrlSuccess = (captchaUrl) => ({
   type: GET_CAPTCHA_URL_SUCCESS,
   payload: {captchaUrl}
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


export const login = (email, password, rememberMe, captcha) => {
   return async (dispatch) => {
      let response = await authAPI.login(email, password, rememberMe, captcha)
      if (response.resultCode === 0) {
         dispatch(getAuthUser())
      } else {
         if (response.resultCode === 10) {
            dispatch(getCaptchaUrl())
         }
         const errorMessage = await response.messages
         dispatch(stopSubmit(errorMessage))
         return Promise.reject(errorMessage)
      }
   }
}

export const getCaptchaUrl = () => {
   return async (dispatch) => {
      const response = await securityAPI.getCaptchaUrl()
      const captchaUrl = response.url
      dispatch(getCaptchaUrlSuccess(captchaUrl))
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