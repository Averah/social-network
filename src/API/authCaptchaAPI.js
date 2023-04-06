
import { axiosInstance } from "./axiosInstance";

export const authCaptchaAPI = () => {
    return axiosInstance
      .get(`security/get-captcha-url`, {}) 
  }

  

