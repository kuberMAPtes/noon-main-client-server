import axiosInstance from "../../../lib/axiosInstance";

// 인증번호 전송
export const sendAuthentificationNumber = async (phoneNumber) => {
    try {
        console.log('sendAuthentificationNumber 요청:', { phoneNumber });
        // const response = await axiosInstance.get(`/member/sendAuthentificationNumber`, {
        //     params: { phoneNumber },
        // });
        const response = { data : {info:1234} } ;
        console.log('sendAuthentificationNumber 응답:', response.data);
        return response.data;
    } catch (error) {
        console.error('문자전송에러 error:', error);
        throw error;
    }
};

// 인증번호 확인
export const confirmAuthentificationNumber = async (phoneNumber, authentificationNumber) => {
    try {
        console.log('confirmAuthentificationNumber 요청:', { phoneNumber, authentificationNumber });
        // const response = await axiosInstance.get(`/member/confirmAuthentificationNumber`, {
        //     params: { phoneNumber, authentificationNumber },
        // });
        // const response = { data : {info:true} };
        if(authentificationNumber === "1234"){
            return {info:true};
        }
        const response = {data : {info:false}};
        console.log('confirmAuthentificationNumber 응답:', response.data);
        
        return response.data;
    } catch (error) {
        console.error('confirmAuthentificationNumber error:', error);
        throw error;
    }
};

// 회원 ID 확인
export const checkMemberId = async (memberId) => {
    try {
        console.log('checkMemberId 요청:', { memberId });
        const response = await axiosInstance.get(`/member/checkMemberId`, {
            params: { memberId },
        });
        console.log('checkMemberId 응답:', response.data);
        return response.data;
    } catch (error) {
        console.error('checkMemberId error:', error);
        throw error;
    }
};

// 회원 닉네임 확인
export const checkNickName = async (nickname) => {
    try {
        console.log('checkNickName 요청:', { nickname });
        const response = await axiosInstance.get(`/member/checkNickname`, {
            params: { nickname },
        });
        console.log('checkNickName 응답:', response.data);
        return response.data;
    } catch (error) {
        console.error('checkNickName error:', error);
        throw error;
    }
};

// 전화번호 확인
export const checkPhoneNumber = async (phoneNumber) => {
    try {
        console.log('checkPhoneNumber 요청:', { phoneNumber });
        const response = await axiosInstance.get(`/member/checkPhoneNumber`, {
            params: { phoneNumber },
        });
        console.log('checkPhoneNumber 응답:', response.data);
        return response.data;
    } catch (error) {
        console.error('checkPhoneNumber error:', error);
        throw error;
    }
};

// 비밀번호 확인
export const checkPassword = async (memberId, password) => {
    try {
        console.log('checkPassword 요청:', { memberId, password });
        const response = await axiosInstance.get(`/member/checkPassword`, {
            params: { memberId, password },
        });
        console.log('checkPassword 응답:', response.data);
        return response.data;
    } catch (error) {
        console.error('checkPassword error:', error);
        throw error;
    }
};

// 토큰 갱신
export const refreshToken = async () => {
    try {
        console.log('refreshToken 요청');
        const response = await axiosInstance.get(`/member/refreshToken`);
        console.log('refreshToken 응답:', response.data);
        return response.data;
    } catch (error) {
        console.error('refreshToken error:', error);
        throw error;
    }
};

// 로그아웃
export const logout = async () => {
    try {
        console.log('logout 요청');
        const response = await axiosInstance.get(`/member/logout`);
        console.log('logout 응답:', response.data);
        return response.data;
    } catch (error) {
        console.error('logout error:', error);
        throw error;
    }
};

// 회원가입
export const addMember = async (addMemberDto) => {
    try {
        console.log('addMember 요청:', addMemberDto);
        const response = await axiosInstance.post(`/member/addMember`, addMemberDto);
        console.log('addMember 응답:', response.data);
        return response.data;
    } catch (error) {
        console.error('addMember error:', error);
        throw error;
    }
};

// 비밀번호 변경
export const updatePassword = async (memberId, password) => {
    try {
        console.log('updatePassword 요청:', { memberId, password });
        const response = await axiosInstance.post(`/member/updatePassword`, { memberId, password });
        console.log('updatePassword 응답:', response.data);
        return response.data;
    } catch (error) {
        console.error('updatePassword error:', error);
        throw error;
    }
};

// 프로필 사진 변경
export const updateProfilePhoto = async (profilePhotoDto) => {
    try {
        console.log('updateProfilePhoto 요청:', profilePhotoDto);
        const response = await axiosInstance.post(`/member/updateProfilePhoto`, profilePhotoDto);
        console.log('updateProfilePhoto 응답:', response.data);
        return response.data;
    } catch (error) {
        console.error('updateProfilePhoto error:', error);
        throw error;
    }
};

// 프로필 소개 변경
export const updateProfileIntro = async (profileIntroDto) => {
    try {
        console.log('updateProfileIntro 요청:', profileIntroDto);
        const response = await axiosInstance.post(`/member/updateProfileIntro`, profileIntroDto);
        console.log('updateProfileIntro 응답:', response.data);
        return response.data;
    } catch (error) {
        console.error('updateProfileIntro error:', error);
        throw error;
    }
};

// 다정점수 변경
export const updateDajungScore = async (dajungScoreDto) => {
    try {
        console.log('updateDajungScore 요청:', dajungScoreDto);
        const response = await axiosInstance.post(`/member/updateDajungScore`, dajungScoreDto);
        console.log('updateDajungScore 응답:', response.data);
        return response.data;
    } catch (error) {
        console.error('updateDajungScore error:', error);
        throw error;
    }
};

// 회원 조회
export const getMember = async (member) => {
    try {
        console.log('getMember 요청:', member);
        const response = await axiosInstance.post(`/member/getMember`, member);
        console.log('getMember 응답:', response.data);
        return response.data.info;
    } catch (error) {
        console.error('getMember error:', error);
        console.log("그런 계정은 존재하지 않습니다.");
        return null;
    }
};

// 회원 프로필 조회
export const getMemberProfile = async (fromId, toId) => {
    try {
        console.log('getMemberProfile 요청:', { fromId, toId });
        const response = await axiosInstance.post(`/member/getMemberProfile`, { fromId, toId });
        console.log('getMemberProfile 응답:', response.data);
        return response.data.info;
    } catch (error) {
        console.error('getMemberProfile error:', error);
        throw error;
    }
};

// 회원 삭제
export const deleteMember = async (memberId) => {
    try {
        console.log('deleteMember 요청:', { memberId });
        const response = await axiosInstance.post(`/member/deleteMember`, { memberId });
        console.log('deleteMember 응답:', response.data);
        return response.data;
    } catch (error) {
        console.error('deleteMember error:', error);
        throw error;
    }
};

// 회원 관계 추가
export const addMemberRelationship = async (fromId, toId, relationshipType, activated) => {
    try {
        console.log('addMemberRelationship 요청:', { fromId, toId, relationshipType, activated });
        const response = await axiosInstance.post(`/member/addMemberRelationship`, { fromId, toId, relationshipType, activated });
        console.log('addMemberRelationship 응답:', response.data);
        return response.data.info;
    } catch (error) {
        console.error('addMemberRelationship error:', error);
        throw error;
    }
};

// 회원 목록 조회
export const listMembers = async (searchCriteria, page, size) => {
    try {
        console.log('listMembers 요청:', { searchCriteria, page, size });
        const response = await axiosInstance.get(`/members/search`, {
            params: {
                ...searchCriteria,
                page,
                size,
            }
        });
        console.log('listMembers 응답:', response.data);
        return response.data;
    } catch (error) {
        console.error('listMembers error:', error);
        throw error;
    }
};

// 회원 관계 목록 조회
export const getMemberRelationshipList = async (criteria, page, size) => {
    try {
        console.log('getMemberRelationshipList 요청:', { criteria, page, size });
        const response = await axiosInstance.post(`/member/getMemberRelationshipList`, { criteria, page, size });
        console.log('getMemberRelationshipList 응답:', response.data);
        return response.data;
    } catch (error) {
        console.error('getMemberRelationshipList error:', error);
        throw error;
    }
};

// 회원 관계 삭제
export const deleteMemberRelationship = async (fromId, toId) => {
    try {
        console.log('deleteMemberRelationship 요청:', { fromId, toId });
        const response = await axiosInstance.post(`/member/deleteMemberRelationship`, { fromId, toId });
        console.log('deleteMemberRelationship 응답:', response.data);
        return response.data;
    } catch (error) {
        console.error('deleteMemberRelationship error:', error);
        throw error;
    }
};
