import axios from "axios";

export const axiosInstance = axios.create({
  withCredentials: true,
  headers: {
    "API-KEY": "7d155533-d3bd-4d80-af50-1dc93df6d79c",
  },
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
});
