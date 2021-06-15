import {GetItemsType, instance, APIResponseType} from "./api"

export const usersAPI = {

    getUsers(currentPage = 1, pageSize = 100) {
        return instance
            .get<GetItemsType>(`/users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    follow(id: number) {
        return instance
            .post<APIResponseType>(`/follow/${id}`)
            .then(response => response.data)
    },
    unfollow(id: number) {
        return instance.delete(`/follow/${id}`).then(response => response.data) as Promise<APIResponseType>
    },
}