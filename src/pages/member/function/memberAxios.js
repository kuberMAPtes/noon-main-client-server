import axiosInstance from "./axiosInstance";



  export const getMemberProfile = (token, fromId,toId) => {
    return axiosInstance.get(`/member/getMemberProfile/${fromId}/${toId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  };


