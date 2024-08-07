import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'; // uuid 라이브러리에서 v4 버전 사용

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers:{
    'Content-Type' : 'application/json'
  },
  withCredentials: true
});
// 요청 인터셉터 추가
// axiosInstance.interceptors.request.use(config => {
//     // 각 요청에 대해 새로운 UUID 생성
//     config.headers['Request-ID'] = uuidv4();
//     return config;
//   }, error => {
//     const navigate = useNavigate();
//     if(error.response && error.response.status === 403){
//         navigate('/member/getAuthMain');
//     }

//   }, response => response);

let refreshingAvailabe = true;

axiosInstance.interceptors.response.use((response) => {
  console.log(response);
  return response;
}, async (error) => {
  console.log(error);
  if (error.response && error.response.status === 403) {
    console.log("403 Forbidden");
    if (refreshingAvailabe) {
      refreshingAvailabe = false;
      try {
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/member/refresh`, {
          withCredentials: true
        });
        const originalRequestConfig = error.config;
        refreshingAvailabe = true;
        return axiosInstance.request(originalRequestConfig);
      } catch (err) {
          window.location.href = "/member/getAuthMain";
          refreshingAvailabe = true;
          return Promise.reject(error);
      }
    }
  }
  return Promise.reject(error);
});

export default axiosInstance;