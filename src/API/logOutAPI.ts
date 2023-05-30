
import { axiosInstance } from "./axiosInstance";
import { ResultCodesEnum } from './authAPI';


type LogOutAPIType = {
  resultCode:ResultCodesEnum
  messages: string[]
  data: object
}

export const logOutAPI = async() => {
    const response = await axiosInstance
      .delete<LogOutAPIType>(`auth/login`, {})
      return response.data
  }

  

