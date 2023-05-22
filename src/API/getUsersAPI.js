import { axiosInstance } from "./axiosInstance";

export const getUsersAPI = async(currentPage, pageSize, searchData ) => {
  const response = await axiosInstance.get(`users?${searchData ? `term=${searchData}&` : ''}page=${currentPage}&count=${pageSize}`)
    return response.data;
};

// ${searchData ? `&term=${searchData}` : ''}