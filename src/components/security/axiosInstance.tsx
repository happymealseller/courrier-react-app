import axios from "axios";
import { store } from "../../redux/store";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8081"
})

axiosInstance.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const token = state.authentication.jwt
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)