import axios_api from '../../../lib/axios_api';

// 채팅방 생성
export const addChatroom = async(chatRoomData) => {
    try {
        console.log("addChatrom fetching 중....! post data => ", chatRoomData)

        const response = await axios_api.post('/chatroom/addChatroom', chatRoomData);
        console.log('addChatroom fetching 결과 :', response.data);

        return response.data;
    } catch (error) {
        console.error("Error fetching addChatroom", error);
        throw error;
    }
}

// 채팅방 추방
export const kickChatroom = async(chatroomID, targetMemberID) => {
    try {
        console.log("kickChatroom fetching 중....! get data => ", chatroomID, targetMemberID)

        const response = await axios_api.get(`/chatroom/kickChatroom?chatroomId=${chatroomID}&memberId=${targetMemberID}`);
        console.log('kickChatroom fetching 결과 :', response.data);

        return response.data;
    } catch (error) {
        console.error("Error fetching kickChatroom", error);
        throw error;
    }
}

// 채팅방목록 조회 (by memberId)
export const getMyChatrooms = async (memberId) => {
    try {
        console.log("getMyChatrooms fetching 중....! get data => ", memberId)

        const response = await axios_api.get(`/chatroom/getMyChatrooms?memberId=${memberId}`);
        console.log('getMyChatrooms fetching 결과 :', response.data);

        return response.data;
    } catch (error) {
        console.error("Error fetching getMyChatrooms", error);
        throw error;  // Re-throw the error so it can be handled by the caller
    }
};

// 채팅방 정보 불러오기 (by chatroomId)
export const getChatroom = async (chatRoomId) => {
    console.log("getChatroom fetching 중....! get data => ", chatRoomId)

    try {
        const response = await axios_api.get(`/chatroom/getChatroom?roomId=${chatRoomId}`)
        console.log('getChatroom fetching 결과 :', response.data);

        return response.data;
    } catch (error) {
        console.error("Error fetching getChatroom", error);
        throw error;  // Re-throw the error so it can be handled by the caller
    }
}

// 채팅 신청 
export const chatRequest = async(chatApplyData) => {
    console.log("chatRequest fetching 중....! post data => ", chatApplyData)

    try{
        const response = await axios_api.post(`/chatMatching/applyChatting`,chatApplyData)
        console.log('chatRequest fetching 결과 :', response.data);

        return response.data;
    } catch (error){
        console.error("Error fetching chatRequest", error);
        throw error;  // Re-throw the error so it can be handled by the caller
    }
}

// 채팅 신청 목록 확인
export const getChatApply = async(chatApplyId) => {
    try{
        console.log("getChatApply fetching 중....! get data => ", chatApplyId)

        const response = await axios_api.get(`/chatMatching/getChatApply?chatApplyId=${chatApplyId}`)
        console.log('getChatApply fetching 결과 :', response.data);

        return response.data;
    } catch (error){
        console.error("Error fetching getChatApply", error);
        throw error;  // Re-throw the error so it can be handled by the caller
    }
}

// 채팅 수락
export const chatAccept = async(chatApplyDecideTest) => {
    try{
        console.log("chatAccept fetching 중....! post data => ", chatApplyDecideTest)

        const response = await axios_api.post(`/chatMatching/acceptChatting`, chatApplyDecideTest)
        console.log('chatAccept fetching 결과 :', response.data);

        return response.data;
    } catch (error){
        console.error("Error fetching chatAccept", error);
        throw error;  // Re-throw the error so it can be handled by the caller      
    }
}

// 채팅 거절
export const chatReject = async(chatApplyDecideTest) => {
    try{
        console.log("chatReject fetching 중....! post data => ", chatApplyDecideTest)

        const response = await axios_api.post(`/chatMatching/rejectChatting`, chatApplyDecideTest)
        console.log('chatReject fetching 결과 :', response.data);

        return response.data;
    } catch (error){
        console.error("Error fetching chatRejct", error);
        throw error;  // Re-throw the error so it can be handled by the caller      
    }
}

// 새로운 채팅신청 목록 불러오기
export const newChatApplyList = async(memberId) => {
    try{
        console.log("newChatApplyList fetching 중....! get data => ", memberId)

        const response = await axios_api.get(`/chatMatching/newChatApplyList?memberId=${memberId}`)
        console.log('newChatApplyList fetching 결과 :', response.data);

        return response.data;
    } catch (error){
        console.error("Error fetching newChatApplyList", error);
        throw error;  // Re-throw the error so it can be handled by the caller      
    }
}

// 채팅방 자동삭제 시간 받아오기 (반환 : )
export const chatroomDeleteTime = async()=>{
    console.log("chatroomDeleteTime fetching 중....! get data => ")

    try{
        const response = await axios_api.get(`/adminChatroom/chatroomDeleteTime`)
        console.log('chatroomDeleteTime fetching 결과 :', response.data);

        return response.data;

    } catch (error){
        console.error("Error fetching chatroomDeleteTime", error);
        throw error;  // Re-throw the error so it can be handled by the caller      
    }
}

export default axios_api;