import {authAPI} from "../api/api";

const SET_USER_DATA = "SET_USER_DATA"
const SET_USER_PHOTO = "SET_USER_PHOTO"

let initialState = {
   id: null,
   login: null,
   email: null,
   isFetching: false, // homework
   isAuth: false,
   photo: null
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


      default:
         return state
   }
}

export const setAuthUserData = (id, email, login, isAuth) => ({
   type: SET_USER_DATA,
   payload: {id, email, login, isAuth}
})
export const setAuthUserPhoto = (photo) => ({type: SET_USER_PHOTO, photo})

export const getAuthUser = () => (dispatch) => {
   return authAPI.getAuthUserData()
      .then(data => {
         if (data.resultCode === 0) {
            let {id, email, login} = data.data
            dispatch(setAuthUserData(id, email, login, true))
            authAPI.getAuthUserPhoto(id).then(photo => {
               dispatch(setAuthUserPhoto(photo))
            })
         }
      })
}


export const login = (email, password, rememberMe) => {
   return (dispatch) => {
      authAPI.login(email, password, rememberMe).then(data => {
         if (data.resultCode === 0) {
            dispatch(getAuthUser())
         } else {
            alert(data.messages)
         }
      })
   }
}

export const logout = () => {
   return (dispatch) => {
      authAPI.logout().then(data => {
         if (data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
         }
      })
   }
}

export default authReducer