import {instance, APIResponseType} from "./api"

type MeResponseDataType = {
    id: number
    email: string
    login: string
}
type LoginResponseDataType = {
    userId: number
}
export const authAPI = {
    me() {
        return instance.get<APIResponseType<MeResponseDataType>>(`/auth/me`)
            .then(response => response.data)
    },
    getAuthUserPhoto(id: number) {
        return instance.get(`/profile/` + id)
            .then(response => response.data.photos.small)
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) {
        return instance.post<APIResponseType<LoginResponseDataType>>(`/auth/login`, {
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