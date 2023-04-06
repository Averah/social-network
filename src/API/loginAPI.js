
import { axiosInstance } from "./axiosInstance";

export const loginAPI = (data) => {
  return axiosInstance
    .post(`/auth/login`, data)
}



