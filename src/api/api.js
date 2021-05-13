import * as axios from "axios";
import {toggleFollowingProcess} from "../redux/users-reducer";

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

   followUser(id) {
      return instance.post(`/follow/${id}`)
         .then(response => response.data)
   },

   unfollowUser(id) {
      return instance.delete(`/follow/${id}`)
         .then(response => response.data)
   },

   getUserProfile(userId) {
      return instance.get(`/profile/${userId}`)
         .then(response => response.data)
   },

   getAuthUserData() {
      return instance.get(`/auth/me`)
         .then(response => response.data)
   },

   getAuthUserPhoto(id) {
      return instance.get(`/profile/` + id)
         .then(response => response.data.photos.small)
   }
}







