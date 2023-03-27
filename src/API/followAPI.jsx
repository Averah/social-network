
import { axiosInstance } from "./axiosInstance";

export const followAPI = {
  followUser: (id) => {
    return axiosInstance
      .post(`follow/${id}`, {})
      .then((response) => response.data);
  },

  unfollowUser: (id) => {
    return axiosInstance
      .delete(`follow/${id}`, {})
      .then((response) => response.data);
  },
};
