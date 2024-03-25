import axios from "axios";
import { toast } from "react-toastify";

export const baseUrl = "http://localhost:4000/api/v1/";

export const axiosInstance = axios.create({
  baseURL: baseUrl,

});

export const picture = (name) => {
  return `http://localhost:3000/uploads/${name}`;
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["x-access-token"] = JSON.parse(token);
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axiosInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  (err) => {
    // console.log(err);
    const status = err.response ? err.response.status : null;
    if (status) {
      toast.error(err.response.data.message);
    }
    return Promise.reject(err);
  }
);
