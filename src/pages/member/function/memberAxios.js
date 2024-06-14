import axiosInstance from "../../../lib/axiosInstance";

export const getMemberProfile = async (fromId, toId) => {
    try{
        console.log("fromId:",fromId);
        console.log("toId:",toId);
        const response = await axiosInstance.post(`/member/getMemberProfile`, {fromId, toId});
        console.log(response);
        return response.data.info;
        // return null;
    } catch (error) {
        console.error('getMemberProfile error:',error);
        throw error;
    }
};

export const getMember = async (member) => {
    try{
        const response = await axiosInstance.post(`/member/getMember`,member);
        return response.data;
    } catch(error){
        console.error('getMember error:',error);
        console.log("그런 계정은 존재하지 않습니다.");
        return null;
    }
};
