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
// 인증번호전송
export const sendAuthentificationNumber = async (phoneNumber) => {
    try{
        const response = await axiosInstance.get(`/member/sendAuthentificationNumber/`, {
            params : {phoneNumber},
        })
        return response.data;
    }catch (error) {
        console.error('sendAuthentificationNumber error:',error);
        throw error;
    }
}
// 인증번호확인
export const confirmAuthentificationNumber = async (phoneNumber, authentificationNumber) => {
    try{
        const response = await axiosInstance.get(`/member/confirmAuthentificationNumber/`,{
            params : {phoneNumber, authentificationNumber },
        });
        return response.data;
    } catch(error){
        console.error('confirmAuthentificationNumber error:',error);
        throw error;
    }
}

//회원 ID 확인
export const checkMemberId = async (memberId) => {
    try{
        const response = await axiosInstance.get(`/member/checkMemberId/`,{
            params : {memberId},
        });
    }catch(error){
        console.error('checkMemberId error:',error);
        throw error;
    }
}

//회원 닉네임 확인
export const checkNickName = async (nickName) => {
    try{
        const response = await axiosInstance.get(`/member/checkNickName/`,{
            params : {nickName},
        });
    }catch(error){
        console.error('checkNickName error:',error);
        throw error;
    }
};
//전화번호 확인
export const checkPhoneNumber = async (phoneNumber) => {
    try{
        const response = await axiosInstance.get(`/member/checkPhoneNumber/`,{
            params : {phoneNumber},
        });

    }catch(error){
        console.error(`checkPhoneNumber error:`,error);
        throw error;
    }
};
//비밀번호 확인
export const checkPassword = async (memberId, password) => {
    try{
        const response = await axiosInstance.get(`/member/checkPassword/`,{
            params : {memberId, password},
        });

    }catch(error){
        console.error(`checkPassword error:`,error);
        throw error;
    }
};
//토큰 갱신
export const refreshToken = async (refreshToken) => {
    try{
        const response = await axiosInstance.get(`/member/refreshToken/`);
    } catch(error){
        console.error(`refreshToken error:`,error);
        throw error;
    }
};
//로그아웃. 먼저 미들웨어로그아웃함수가 이 함수를 호출한다음 쿠키를 삭제한 다음 리덕스에서 삭제한다. 그리고 리다이렉트 한다.
export const logout = async (memberId) => {
    try{
        const response = await axiosInstance.get(`/member/logout/`);
    }catch(error){
        console.error(`logout error:`,error);
        throw error;
    }
}
//회원가입
export const addMember = async (addMemberDto) => {
    try{
        const response = await axiosInstance.post(`/member/addMember/`,addMemberDto);
    }catch(error){
        console.error(`addMember error:`,error);
        throw error;
    }
};
//