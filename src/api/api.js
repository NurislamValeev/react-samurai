import * as axios from "axios";

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

   follow(id) {
      return instance.post(`/follow/${id}`)
         .then(response => response.data)
   },

   unfollow(id) {
      return instance.delete(`/follow/${id}`)
         .then(response => response.data)
   },

   getUserProfile(userId) {
      console.warn("Obsolete method. Please use profileAPI object.")
      return profileAPI.getUserProfile(userId)
   },
}

export const authAPI = {
   getAuthUserData() {
      return instance.get(`/auth/me`)
         .then(response => response.data)
   },

   getAuthUserPhoto(id) {
      return instance.get(`/profile/` + id)
         .then(response => response.data.photos.small)
   },

   login(email, password, rememberMe = false) {
      return instance.post(`/auth/login`, {
         email,
         password,
         rememberMe
      })
         .then(response => response.data)
   },

   logout() {
      return instance.delete(`/auth/login`).then(response => response.data)
   },
}

export const profileAPI = {

   getUserProfile(userId) {
      return instance.get(`/profile/${userId}`)
         .then(response => response.data)
   },
   getStatus(userId) {
      return instance.get(`/profile/status/${userId}`)
         .then(response => response.data)
   },
   updateStatus(status) {
      return instance.put(`/profile/status`, {status})
   },
   savePhoto(photoFile) {
      const formData = new FormData()
      formData.append("image", photoFile)

      return instance.put(`/profile/photo`, formData)
   },
   saveProfile(profile) {
      return instance.put(`/profile`, profile)
   }

}







