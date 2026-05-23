import axios from "axios";

export let axiosInstance = axios.create({
  baseURL: "https://trial-backend-02dl.onrender.com/api",
  withCredentials: true,
});