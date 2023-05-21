import { axiosInstance } from "./axiosInstance";

export const getFollowdUsersAPI = (currentPage, pageSize) => {
  return axiosInstance
    .get(`users?page=${currentPage}&count=${pageSize}`)
    .then((response) => response.data);
};


