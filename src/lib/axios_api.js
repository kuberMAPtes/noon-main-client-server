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

axios_api.interceptors.response.use((response) => {
    console.log(response);
    return response;
}, async (error) => {
    if (error.response && error.response.status === 403) {
        try {
            await axios.get(`${BASE_URL}/member/refresh`);
            const originalRequestConfig = error.config;
            return axios_api.request(originalRequestConfig);
        } catch(err) {
            // alert("로그인이 필요합니다.");
            // window.location.href = "/member/getAuthMain";
            return Promise.reject(error);
        }
    }
    return Promise.reject(error);
});

export default axios_api;