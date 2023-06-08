import { UserType } from './../Types/types';
import { axiosInstance } from "./axiosInstance";



type GetUsersType = {
  error: string | null
  items: Array<UserType>
  totalCount: number
}

export const getUsersAPI = async (currentPage:number, pageSize:number, searchData?: string) => {
  const response = await axiosInstance.get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}${searchData ? `&term=${searchData}` : ''}`)
    return response.data;
};

