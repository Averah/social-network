import { UserType } from './../Types/types';
import { axiosInstance } from "./axiosInstance";



type GetUsersType = {
  error: string
  items: Array<UserType>
  totalCount: number
}

export const getUsersAPI = async (currentPage:number, pageSize:number, searchData?:string ) => {
  const response = await axiosInstance.get<GetUsersType>(`users?${searchData ? `term=${searchData}&` : ''}page=${currentPage}&count=${pageSize}`)
    return response.data;
};

