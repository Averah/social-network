
import { axiosInstance } from "./axiosInstance";

type SecurityAPIType = {
  url: string
}

export const securityAPI  = {
  async getCaptchaURL() {
    const response = await axiosInstance
      .get<SecurityAPIType>(`security/get-captcha-url`) 
      return response.data
  }
  }

  

