import { axiosInstance } from "./axiosInstance";

export const profileAPI = {
  getProfile(userId) {
    return axiosInstance
      .get(`profile/${userId}`)
  },
  getStatus(userId) {
    return axiosInstance
    .get(`profile/status/${userId}`)
  },
  updateStatus(status) {
    return axiosInstance
    .put(`profile/status`, {status: status})
  }

};


