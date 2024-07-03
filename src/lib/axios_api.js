import axios from 'axios';
import { MAIN_API_URL } from "../util/constants";

const BASE_URL = MAIN_API_URL;

const axios_api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

let refreshingAvailabe = true;

axios_api.interceptors.response.use((response) => {
    console.log(response);
    return response;
}, async (error) => {
    console.log(error);
    if (error.response && error.response.status === 403) {
        console.log("403 Forbidden");
        if (refreshingAvailabe) {
            refreshingAvailabe = false;
            try {
                await axios.get(`${BASE_URL}/member/refresh`, {
                    withCredentials: true
                });
                const originalRequestConfig = error.config;
                refreshingAvailabe = true;
                return axios_api.request(originalRequestConfig);
            } catch (err) {
                window.location.href = "/member/getAuthMain";
                refreshingAvailabe = true;
                return Promise.reject(error);
            }
        }
    }
    return Promise.reject(error);
});

export default axios_api;