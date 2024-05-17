import axios from "axios";
import { LocalStorageKey } from "../../utilities/enums/LocalStorageKey";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8081"
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(LocalStorageKey.Jwt);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)