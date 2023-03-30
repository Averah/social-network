import { axiosInstance } from "./axiosInstance";

export const getUsersAPI = (currentPage, pageSize) => {
  return axiosInstance
    .get(`users?page=${currentPage}&count=${pageSize}`)
    .then((response) => response.data);
};


