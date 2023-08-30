import { axiosInstance } from "./axiosInstance";
import { ProfileType, PhotosType } from '../Types/types';
import { ResultCodesEnum } from './authAPI';


type APIResultType = {
  resultCode: ResultCodesEnum
  messages: string[]
  data: object
}

type SavePhotoDataType = {
  data: {
    photos: PhotosType
  }
}


export const profileAPI = {
  async getProfile(userId: number | null) {
    const response = await axiosInstance
      .get<ProfileType>(`profile/${userId}`)
    return response.data
  },
  async getStatus(userId: number | null) {
    const response = await axiosInstance
      .get<string>(`profile/status/${userId}`)
    return response.data
  },
  async updateStatus(status: string) {
    const response = await axiosInstance
      .put<APIResultType>(`profile/status`, { status })
    return response.data
  },
  async savePhoto(photoFile: File) {
    const formData = new FormData()
    formData.append("image", photoFile)
    const response = await axiosInstance.put<SavePhotoDataType>('profile/photo', formData)
    return response.data.data
  },
  saveProfile(profile: ProfileType) {
    return axiosInstance.put<APIResultType>('profile', profile)

  }

};


