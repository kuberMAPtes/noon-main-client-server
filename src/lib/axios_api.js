import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const axios_api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 채팅방 생성
export const addChatroom = async(chatRoomData) => {
    try {
        console.log("addChatrom fetching 중....!")

        const response = await axios_api.post('/chatroom/addChatroom', chatRoomData);
        console.log('addChatroom:', response.data);

        return response.data;
    } catch (error) {
        console.error("Error fetching addChatroom", error);
        throw error;
    }
}

// 채팅방목록 조회 (by memberId)
export const getMyChatrooms = async (memberId) => {
    try {
        console.log("addChatrom fetching 중....!")

        const response = await axios_api.get(`/chatroom/getMyChatrooms?userId=${memberId}`);
        console.log('getMyChatrooms:', response.data);

        return response.data;
    } catch (error) {
        console.error("Error fetching getMyChatrooms", error);
        throw error;  // Re-throw the error so it can be handled by the caller
    }
};

// 채팅방 정보 불러오기 (by chatroomId)
export const getChatroom = async (chatRoomId) => {
    try {
        console.log("addChatrom fetching 중....!")
        
        const response = await axios_api.get(`/chatroom/getChatroom?roomId=${chatRoomId}`)
        console.log('getChatroom:', response.data);

        return response.data;
    } catch (error) {
        console.error("Error fetching getChatroom", error);
        throw error;  // Re-throw the error so it can be handled by the caller
    }
}

export default axios_api;