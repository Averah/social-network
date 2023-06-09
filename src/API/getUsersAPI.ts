import { UserType } from './../Types/types';
import { axiosInstance } from "./axiosInstance";
import { FilterType } from '../redux/usersReducer';



type GetUsersType = {
  error: string | null
  items: Array<UserType>
  totalCount: number
}

export const getUsersAPI = async (currentPage:number, pageSize:number, searchData?:string, friend?:string) => {
  const response = await axiosInstance
  .get<GetUsersType>
  (`users?page=${currentPage}&count=${pageSize}${searchData ? `&term=${searchData}` : ''}${friend ? `&friend=${friend}` : ''}`)
    return response.data;
};

