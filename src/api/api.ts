import axios from "axios"
import {UserType} from "../types/types"

export const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0",
    headers: {
        "API-KEY": "4c123ef5-4b33-4408-a370-12cbaba4b851"
    },
})

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}

export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}
export type APIResponseType<D = {}> = {
    data: D
    resultCode: ResultCodesEnum
    messages: Array<string>
}