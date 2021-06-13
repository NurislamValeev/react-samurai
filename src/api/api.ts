import axios from "axios";
import {ProfileType} from "../types/types";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0",
    headers: {
        "API-KEY": "4c123ef5-4b33-4408-a370-12cbaba4b851"
    },
})

export const usersAPI = {

    getUsers(currentPage = 1, pageSize = 100) {
        return instance
            .get(`/users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },

    follow(id: number) {
        return instance.post(`/follow/${id}`)
            .then(response => response.data)
    },

    unfollow(id: number) {
        return instance.delete(`/follow/${id}`)
            .then(response => response.data)
    },

    getUserProfile(userId: number) {
        console.warn("Obsolete method. Please use profileAPI object.")
        return profileAPI.getUserProfile(userId)
    },
}

export const profileAPI = {

    getUserProfile(userId: number) {
        return instance.get(`/profile/${userId}`)
            .then(response => response.data)
    },
    getStatus(userId: number) {
        return instance.get(`/profile/status/${userId}`)
            .then(response => response.data)
    },
    updateStatus(status: string) {
        return instance.put(`/profile/status`, {status})
    },
    savePhoto(photoFile: any) {
        const formData = new FormData()
        formData.append("image", photoFile)

        return instance.put(`/profile/photo`, formData)
    },
    saveProfile(profile: ProfileType) {
        return instance.put(`/profile`, profile)
    }

}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}

type MeResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}

type LoginResponseType = {
    data: {
        userId: number
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}

export const authAPI = {
    me() {
        return instance.get<MeResponseType>(`/auth/me`)
            .then(response => response.data)
    },

    getAuthUserPhoto(id: number) {
        return instance.get(`/profile/` + id)
            .then(response => response.data.photos.small)
    },

    login(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) {
        return instance.post<LoginResponseType>(`/auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        })
            .then(response => response.data)
    },

    logout() {
        return instance.delete(`/auth/login`).then(response => response.data)
    },
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`/security/get-captcha-url`)
            .then(response => response.data)
    },
}







