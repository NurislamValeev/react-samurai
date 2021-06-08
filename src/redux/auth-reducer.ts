import {authAPI, securityAPI} from "../api/api";

const SET_USER_DATA = "samurai-network/auth/SET_USER_DATA"
const GET_CAPTCHA_URL_SUCCESS = "samurai-network/auth/GET_CAPTCHA_URL_SUCCESS"
const SET_USER_PHOTO = "samurai-network/auth/SET_USER_PHOTO"
const STOP_SUBMIT = "samurai-network/auth/STOP_SUBMIT"

let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isFetching: false as boolean,
    isAuth: false,
    photo: null as string | null,
    errorMessage: null as string | null,
    captchaUrl: null as string | null
}

export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                id32: "ds",
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

type SetAuthUserDataActionPayloadType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: SetAuthUserDataActionPayloadType
}

export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean)
    : SetAuthUserDataActionType => ({
    type: SET_USER_DATA,
    payload: {id, email, login, isAuth}
})

type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: { captchaUrl: string }
}

export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl}
})
export const setAuthUserPhoto = (photo: string) => ({type: SET_USER_PHOTO, photo})
export const stopSubmit = (errorMessage: string) => ({type: STOP_SUBMIT, errorMessage})


export const getAuthUser = () => async (dispatch: any) => {
    let response = await authAPI.getAuthUserData()
    if (response.resultCode === 0) {
        let {id, email, login} = response.data
        dispatch(setAuthUserData(id, email, login, true))

        let photo = await authAPI.getAuthUserPhoto(id)
        dispatch(setAuthUserPhoto(photo))
    }

}


export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => {
    return async (dispatch: any) => {
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
    return async (dispatch: any) => {
        const response = await securityAPI.getCaptchaUrl()
        const captchaUrl = response.url
        dispatch(getCaptchaUrlSuccess(captchaUrl))
    }
}

export const logout = () => {
    return async (dispatch: any) => {
        let response = await authAPI.logout()
        if (response.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
        }
    }
}

export default authReducer