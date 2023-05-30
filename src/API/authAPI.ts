
import { axiosInstance } from "./axiosInstance";

type authAPIType = {
  data: {id: number, email: string, login: string}
  resultCode: ResultCodesEnum
  messages: string []
}

export enum ResultCodesEnum {
  Success = 0,
  Error = 1
}

export const authAPI = async () => {
  const response = await axiosInstance
  .get<authAPIType>(`auth/me`, {})
    return response.data
  }

  

