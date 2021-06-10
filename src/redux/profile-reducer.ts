import {profileAPI, usersAPI} from "../api/api";
import {PhotosType, ProfileType} from "../types/types";

const SET_USER_PROFILE = "SET_USER_PROFILE"
const SET_STATUS = "SET_STATUS"
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS"
const STOP_SUBMIT = "STOP_SUBMIT"

let initialState = {
    profile: null as ProfileType | null,
    status: "",
    errorMessage: ""
}

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }

        case SET_STATUS: {
            return {...state, status: action.status}
        }

        case SAVE_PHOTO_SUCCESS: {
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        }

        case STOP_SUBMIT: {
            return {...state, errorMessage: action.errorMessage}
        }

        default:
            return state
    }
}

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType)
    : SetUserProfileActionType => ({type: SET_USER_PROFILE, profile})

type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatus = (status: string): SetStatusActionType => ({type: SET_STATUS, status})

type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}
export const savePhotoSuccess = (photos: PhotosType)
    : SavePhotoSuccessActionType => ({type: SAVE_PHOTO_SUCCESS, photos})

type StopSubmitActionType = {
    type: typeof STOP_SUBMIT
    errorMessage: string
}
export const stopSubmit = (errorMessage: string): StopSubmitActionType => ({type: STOP_SUBMIT, errorMessage})

export const getUserProfileThunk = (userId: number) => {
    return async (dispatch: any) => {
        const response = await usersAPI.getUserProfile(userId)
        dispatch(setUserProfile(response))
    }
}

export const getStatus = (userId: number) => {
    return async (dispatch: any) => {
        let response = await profileAPI.getStatus(userId)
        dispatch(setStatus(response))
    }
}

export const updateStatus = (status: string) => {
    return async (dispatch: any) => {
        try {
            let response = await profileAPI.updateStatus(status)
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status))
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const savePhoto = (file: any) => {
    return async (dispatch: any) => {
        let response = await profileAPI.savePhoto(file)
        if (response.data.resultCode === 0) {
            dispatch(savePhotoSuccess(response.data.data.photos))
        }
    }
}

export const saveProfile = (profile: ProfileType) => {
    return async (dispatch: any, getState: any) => {
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
