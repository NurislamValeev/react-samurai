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
            ...action.data,
            isAuth: true
         }

      case SET_USER_PHOTO:
         return {
            ...state, photo: action.photo
         }


      default:
         return state
   }
}

export const setAuthUserData = (id, email, login) => ({type: SET_USER_DATA, data: {id, email, login}})
export const setAuthUserPhoto = (photo) => ({type: SET_USER_PHOTO, photo})
export default authReducer