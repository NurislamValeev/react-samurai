import {ResultCodesEnum} from "../api/api";
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/security-api";

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
                ...state,
                ...action.payload,
                // id32: "ds",
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

export const actions = {
    setAuthUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: SET_USER_DATA,
        payload: {id, email, login, isAuth}
    } as const),

    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: GET_CAPTCHA_URL_SUCCESS,
        payload: {captchaUrl}
    } as const),

}

export const setAuthUserPhoto = (photo: string) => ({type: SET_USER_PHOTO, photo})
export const stopSubmit = (errorMessage: string) => ({type: STOP_SUBMIT, errorMessage})


export const getAuthUser = () => async (dispatch: any) => {
    let response = await authAPI.me()

    if (response.resultCode === ResultCodesEnum.Success) {
        let {id, email, login} = response.data
        dispatch(actions.setAuthUserData(id, email, login, true))

        let photo = await authAPI.getAuthUserPhoto(id)
        dispatch(setAuthUserPhoto(photo))
    }

}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => {
    return async (dispatch: any) => {
        let response = await authAPI.login(email, password, rememberMe, captcha)
        if (response.resultCode === ResultCodesEnum.Success) {
            dispatch(getAuthUser())
        } else {
            if (response.resultCode === ResultCodesEnum.CaptchaIsRequired) {
                dispatch(getCaptchaUrl())
            }
            const errorMessage = await response.messages[0]
            dispatch(stopSubmit(errorMessage))
            return Promise.reject(errorMessage)
        }
    }
}

export const getCaptchaUrl = () => {
    return async (dispatch: any) => {
        const response = await securityAPI.getCaptchaUrl()
        const captchaUrl = response.url
        dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
    }
}

export const logout = () => {
    return async (dispatch: any) => {
        let response = await authAPI.logout()
        if (response.resultCode === ResultCodesEnum.Success) {
            dispatch(actions.setAuthUserData(null, null, null, false))
        }
    }
}

export default authReducer