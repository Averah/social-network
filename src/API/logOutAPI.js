
import { axiosInstance } from "./axiosInstance";

export const logOutAPI = () => {
    return axiosInstance
      .delete(`auth/login`, {})
      
  }

  

