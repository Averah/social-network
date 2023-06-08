
import { axiosInstance } from "./axiosInstance";
import { ResultCodesEnum } from './authAPI';

export type FollowUnfollowType = {
  resultCode: ResultCodesEnum
  messages: string[]
  data: object
}


export const followAPI = {
  async followUser(id:number) {
    const response = await axiosInstance
      .post<FollowUnfollowType>(`follow/${id}`, {})
      return response.data
  },

  async unfollowUser(id:number) {
    const response = await  axiosInstance
      .delete<FollowUnfollowType>(`follow/${id}`, {})
    return response.data 
  },
};
