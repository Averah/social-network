
import { axiosInstance } from "./axiosInstance";

export const authAPI = () => {
    return axiosInstance
      .get(`auth/me`, {})
      
  }

  

