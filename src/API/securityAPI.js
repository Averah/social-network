
import { axiosInstance } from "./axiosInstance";

export const securityAPI  = {
  getCaptchaURL() {
    return axiosInstance
      .get(`security/get-captcha-url`) 
  }
  }

  

