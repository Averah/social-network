import { LoginDataType } from './../redux/authReducer';

import { axiosInstance } from "./axiosInstance";
import { ResultCodesEnum } from './authAPI';

export enum ResultCodeForCaptchaEnum {
  CaptchaIsRequired = 10
}

type LoginAPIType = {
  resultCode:ResultCodesEnum | ResultCodeForCaptchaEnum
  messages: string[]
  data: {userId: number}
}

export const loginAPI = async (data: LoginDataType) => {
  const response = await axiosInstance
    .post<LoginAPIType>(`/auth/login`, data)
    return response.data
}


