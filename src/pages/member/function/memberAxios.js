import axiosInstance from "../../../lib/axiosInstance";
import profilePhotoGetter from "./profilePhotoGetter";

// 인증번호 전송
export const sendAuthentificationNumber = async (phoneNumber) => {
  try {
    console.log("sendAuthentificationNumber 요청:", { phoneNumber });
    const response = await axiosInstance.get(`/member/sendAuthentificationNumber`, {
        params: { phoneNumber },
    });
    // const response = { data: { info: 1234 } }; 
    //위에 주석 풀고 그 위에 주석하기
    console.log("sendAuthentificationNumber 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("문자전송에러 error:", error);
    return null
  }
};

// 인증번호 확인
export const confirmAuthentificationNumber = async (
  phoneNumber,
  authentificationNumber
) => {
  try {
    console.log("confirmAuthentificationNumber 요청:", {
      phoneNumber,
      authentificationNumber,
    });

    const authNumber = authentificationNumber;
    const response = await axiosInstance.get(`/member/confirmAuthentificationNumber`, {
        params: { phoneNumber, authNumber },
    });
    // if (authentificationNumber === "1234") {
    //   return { info: true };
    // }
    // const response = { data: { info: false } };
    //이거랑 위에 주석 하고 위에 주석 풀자
    console.log("confirmAuthentificationNumber 응답:", response.data);

    return response.data;
  } catch (error) {
    console.error("confirmAuthentificationNumber error:", error);
    return null
  }
};

// 회원 ID 확인
export const checkMemberId = async (memberId) => {
  try {
    console.log("checkMemberId 요청:", { memberId });
    const response = await axiosInstance.get(`/member/checkMemberId`, {
      params: { memberId },
    });
    console.log("checkMemberId 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("checkMemberId error:", error);
    return null
  }
};

// 회원 닉네임 확인
export const checkNickname = async (inputNickname) => {
  try {
    const nickname = encodeURIComponent(inputNickname);
    console.log("checkNickName 요청:", { inputNickname });
    const response = await axiosInstance.get(`/member/checkNickname`, {
      params: { nickname },
    });
    console.log("checkNickName 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("checkNickName error:", error);
    return null
  }
};

// 전화번호 확인
export const checkPhoneNumber = async (phoneNumber) => {
  try {
    console.log("checkPhoneNumber 요청:", { phoneNumber });
    const response = await axiosInstance.get(`/member/checkPhoneNumber`, {
      params: { phoneNumber },
    });
    console.log("checkPhoneNumber 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("checkPhoneNumber error:", error);
    return null
  }
};
export const checkPhoneNumberAndMemberId = async (memberId, phoneNumber) => {
  try {
    const response = await axiosInstance.get(
      `/member/checkPhoneNumberAndMemberId`,
      {
        params: { memberId, phoneNumber },
      }
    );
    return response.data;
  } catch (error) {
    console.error("checkPhoneNumberAndMemberId error:", error);
    return null
  }
};
// 비밀번호 확인
export const checkPassword = async (memberId, password) => {
  try {
    console.log("checkPassword 요청:", { memberId, password });
    const response = await axiosInstance.get(`/member/checkPassword`, {
      params: { memberId, password },
    });
    console.log("checkPassword 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("checkPassword error:", error);
    return null
  }
};

// 토큰 갱신
export const refreshToken = async () => {
  try {
    console.log("refreshToken 요청");
    const response = await axiosInstance.get(`/member/refreshToken`);
    console.log("refreshToken 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("refreshToken error:", error);
    return null
  }
};
// 로그인
export const Login = async (loginRequestDto) => {
  try {
    console.log("login 요청:", loginRequestDto);
    const response = await axiosInstance.post(`/member/login`, loginRequestDto);
    console.log("login 응답 response :", response);
    return response.data;
  } catch (error) {
    console.error("login error:", error);
    return error.response.data;
  }
};
// 구글 로그인
export const googleLogin = async (googleLoginRequestDto) => {
  try {
    console.log("googleLogin 요청");

    const response = await axiosInstance.post(
      `/member/googleLogin`,
      googleLoginRequestDto
    );
    console.log("googleLogin 응답 response :", response);
    return response.data.info;
  } catch (error) {
    console.error("googleLogin error:", error);
    return null
  }
};

// 로그아웃
export const logout = async () => {
  try {
    console.log("logout 요청");
    const response = await axiosInstance.get(`/member/logout`);
    console.log("logout 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("logout error:", error);
    return null
  }
};

// 회원가입
export const addMember = async (addMemberDto) => {
  try {
    console.log("addMember 요청:", addMemberDto);
    const response = await axiosInstance.post(
      `/member/addMember`,
      addMemberDto
    );
    console.log("addMember 응답:", response);
    return response.data.info;
  } catch (error) {
    console.error("addMember error:", error);
    return null
  }
};
// 회원 정보 변경 : 주소변경가능

// 비밀번호 변경
export const updatePwd = async (memberId, pwd) => {
  try {
    console.log("updatePwd 요청:", { memberId, pwd });
    const response = await axiosInstance.post(`/member/updatePwd`, {
      memberId,
      pwd,
    });
    //alert("updatePwd 응답 : response.data.info :: "+response.data.info);
    console.log("updatePwd 응답:", response.data.info);
    return response.data.info;
  } catch (error) {
    console.error("updatePwd error:", error);
    return null
  }
};

// 프로필 사진 변경
export const updateProfilePhoto = async (profilePhotoDto) => {
  try {
    console.log("updateProfilePhoto 요청:", profilePhotoDto);
    const response = await axiosInstance.post(
      `/member/updateProfilePhoto`,
      profilePhotoDto
    );
    console.log("updateProfilePhoto 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("updateProfilePhoto error:", error);
    return null
  }
};

// 프로필 소개 변경
export const updateProfileIntro = async (profileIntroDto) => {
  try {
    console.log("updateProfileIntro 요청:", profileIntroDto);
    const response = await axiosInstance.post(
      `/member/updateProfileIntro`,
      profileIntroDto
    );
    console.log("updateProfileIntro 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("updateProfileIntro error:", error);
    return null
  }
};
//
export const updateMember = async (memberDto) => {

  try{
    console.log("updateMember 요청:",memberDto);
    const response = await axiosInstance.post(`/member/updateMember`,memberDto);
    console.log("updateMember 응답:",response.data);
    // alert("결과 response.data" + JSON.stringify(response.data));
    return response.data;
  } catch(error) {
    console.error("updateMember error:", error);
    return null;
  }
}
export const updateProfilePhotoUrl = async (memberId, file) => {
  const formData = new FormData();
  formData.append("multipartFile", file);

  try {
    const response = await axiosInstance.post(
      `member/updateProfilePhotoUrl/${memberId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.info;
  } catch (error) {
    console.error("파일 업로드 오류:", error);
    throw error; // 오류가 발생하면 호출한 쪽에서 처리할 수 있도록 오류를 던짐
  }
};
// 다정점수 변경
export const updateDajungScore = async (dajungScoreDto) => {
  try {
    console.log("updateDajungScore 요청:", dajungScoreDto);
    const response = await axiosInstance.post(
      `/member/updateDajungScore`,
      dajungScoreDto
    );
    console.log("updateDajungScore 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("updateDajungScore error:", error);
    return null
  }
};

//전화번호변경
export const updatePhoneNumber = async (phoneNumberDto) => {
  try{
    console.log("updatePhoneNumber 요청:",phoneNumberDto);
    const response = await axiosInstance.post(`/member/updatePhoneNumber`,phoneNumberDto);
    console.log("updatePhoneNumber 응답:",response);
    // alert("updatePhoneNumber 응답:"+JSON.stringify(response));
    return response.data.info;
  }catch(error){
    console.error("updatePhoneNumber error:",error);
    return null
  }
}

// 회원 조회
export const getMember = async (member) => {
  try {
    console.log("getMember 요청:", member);
    const response = await axiosInstance.post(`/member/getMember`, member);
    console.log("getMember 응답 response:", response);
    return response.data.info;
  } catch (error) {
    console.error("getMember error:", error);
    console.log("그런 계정은 존재하지 않습니다.");
    return null;
  }
};
export const checkMemberIdExisted = async (memberId) => {
  try {
    //alert('checkMemberIdExisted 요청:'+ memberId);
    const response = await axiosInstance.get(`/member/checkMemberIdExisted`, {
      params: { memberId },
    });
    //alert('checkMemberIdExisted 응답 response:'+ JSON.stringify(response));

    if (response.data.info === true) {
      // alert("서버에서 true반환");
      return true; // memberId 속성이 있는 경우 true 반환
    } else {
      return false; // memberId 속성이 없는 경우 false 반환
    }
  } catch (error) {
    console.error("checkMemberIdExisted error:", error);
    return false; // 에러 발생 시에도 false 반환
  }
};
export const getMemberIdByPhoneNumber = async (phoneNumber) => {
  try {
    console.log("getMemberIdByPhoneNumber", phoneNumber);
    const response = await axiosInstance.get(
      `/member/getMemberIdByPhoneNumber`,
      {
        params: { phoneNumber },
      }
    );
    console.log("getMemberIdByPhoneNumber 응답:", response);

    if (response.data.message !== "") {
      response.data.info = false;
    }
    return response.data.info; //info가 false면 없는 번호라고 하면 됨.
  } catch (error) {
    // console.error("getMemberByPhoneNumber error:", error); 없는 번호면 그냥 에러를 
    return false;
  }
};

// 회원 프로필 조회
export const getMemberProfile = async (fromId, toId) => {
  try {
    console.log("getMemberProfile 요청:", { fromId, toId });
    const response = await axiosInstance.post(`/member/getMemberProfile`, {
      fromId,
      toId,
    });
    console.log("getMemberProfile 응답:", response.data);


    const profileAccessResultDto = response.data.info;
    const profile = profileAccessResultDto.memberProfile;
    //차단 당하지 않았으면
    if(!profile){

      return profileAccessResultDto.message;

    }else{
      if(profile.profilePhotoUrl && profile.profilePhotoUrl.includes("https://noon-storage-bucket")){
        
        const getProfilePhotoUrl = async () => {
          try {
            const {url} = await profilePhotoGetter(toId);
            profile.profilePhotoUrl = url;
          } catch(error){
            console.error("getProfilePhotoUrl error:", error);
          }
        }
        getProfilePhotoUrl();
      }
    }
    return profile;
    

  } catch (error) {
    console.error("getMemberProfile error:", error);
    return null
  }
};

// 회원 삭제
export const deleteMember = async (memberId) => {
  try {
    console.log("deleteMember 요청:", { memberId });
    const response = await axiosInstance.post(`/member/deleteMember`, {
      memberId,
    });
    console.log("deleteMember 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("deleteMember error:", error);
    return null
  }
};

// 회원 관계 추가
export const addMemberRelationship = async (
  fromId,
  toId,
  relationshipType,
  activated
) => {
  try {
    console.log("addMemberRelationship 요청:", {
      fromId,
      toId,
      relationshipType,
      activated,
    });
    const response = await axiosInstance.post(`/member/addMemberRelationship`, {
      fromId,
      toId,
      relationshipType,
      activated,
    });
    console.log("addMemberRelationship 응답:", response.data);
    return response.data.info;
  } catch (error) {
    console.error("addMemberRelationship error:", error);
    return null
  }
};
// 회원 관계 삭제
export const deleteMemberRelationship = async (fromId, toId, relationshipType, activated) => {
  try {
    console.log("deleteMemberRelationship 요청:", { fromId, toId });
    const response = await axiosInstance.post(
      `/member/deleteMemberRelationship`, {
        fromId,
        toId,
        relationshipType,
        activated,
      }
    );
    console.log("deleteMemberRelationship 응답:", response.data);
    return response.data.info;
  } catch (error) {
    console.error("deleteMemberRelationship error:", error);
    return null
  }
};
// 회원 목록 조회
export const listMembers = async (searchCriteria, page, size) => {
  try {
    console.log("listMembers 요청:", { searchCriteria, page, size });
    const response = await axiosInstance.get(`/members/search`, {
      params: {
        ...searchCriteria,
        page,
        size,
      },
    });
    console.log("listMembers 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("listMembers error:", error);
    return null
  }
};
export const getMemberRelationship = async (fromId,toId) => {
  try{
    console.log("getMemberRelationship 요청:",{fromId,toId});
    const response = await axiosInstance.get(`/member/getFollowRelationship`,
    {params:{fromId,toId}}
    );
    console.log("getMemberRelationship 응답:",response.data.info);

    const map = response.data.info;
    //from이 나 > 너 , to가 너>나
    if(map.from===null && map.to===null){
      return "NONE"
    }else if(map.from===null){
      return "FOLLOWER"
    }else if(map.to===null){
      return "FOLLOWING"
    }else{
      return "MUTUAL"
    }
    //from이 null이자나? 그러면 내가 너한테 팔로우 안한거임 
    
    //to가 null이자나? 그러면 너가 나한테 팔로우 안한거임
    //둘다 null이면 둘다 팔로우 안한거임
    //둘다 있으면 둘다 팔로우한거임
    
  }catch(error){
    console.error("getMemberRelationship error:", error);
    return null
  }
}
export const getBlockMemberRelationship = async (fromId,toId) => {
  try{
    console.log("getBlockMemberRelationship 요청:",{fromId,toId});
    const response = await axiosInstance.get(`/member/getBlockRelationship`,
    {params:{fromId,toId}}
    );
    // alert("getBlockMemberRelationship 응답:"+JSON.stringify(response.data.info));
    const map = response.data.info;
    //from이 나 > 너 , to가 너>나
    if(map.from===null && map.to===null){
      return "NONE"
    }else if(map.from===null){
      return "BLOCKER"
    }else if(map.to===null){
      return "BLOCKING"
    }else{
      return "MUTUAL"
    }
  }catch(error){
    console.error("getBlockMemberRelationship error:", error);
    return null
  }
}
//대상 회원에 대한 모든 회원관계 목록을 가져오는 회원관계목록조회
export const getMemberRelationshipList = async (criteria, page, size) => {
    try {
      console.log("getMemberRelationshipList 요청:", { criteria, page, size });
  
      const { fromId, toId, following, follower, blocking, blocker } = criteria;
  
      const res = await axiosInstance.post(
        `/member/getMemberRelationshipList`,
        { fromId, toId, page, size, following, follower, blocking, blocker }
      );
      console.log("getMemberRelationshipList 응답:", res.data.info);
      // alert("getMemberRelationshipList 응답:"+JSON.stringify(res.data.info));
      const map = res.data.info;

      //초기화에 관한 에러처리
      if (!Array.isArray(map.dtoList)) {
        // console.error('Expected an array but received:', response);
        return;
      }
  
      // 관계 유형에 따라 토탈 개수 세기 and 필요한 데이터만 가져오기
      const response = map.dtoList
      const receivedFollowerCount = map.totalFollowerCount;
      const receivedFollowingCount = map.totalFollowingCount;
      const receivedBlockerCount = map.totalBlockerCount;
      const receivedBlockingCount = map.totalBlockingCount;

  
      return {
        response,
        receivedFollowerCount,
        receivedFollowingCount,
        receivedBlockerCount,
        receivedBlockingCount
      };
    } catch (error) {
      console.error("getMemberRelationshipList error:", error);
      return null
    }
  };
export const getBuildingSubscriptionCount = async (memberId) => {
  try{
    // alert("getBuildingSubscriptionCount 요청:"+memberId);
    const buildingDtoList = await axiosInstance.get(`/buildingProfile/getMemberSubscriptionList`,{
      params:{memberId}
    });
    // alert("getBuildingSubscriptionCount 응답:"+JSON.stringify(buildingDtoList.data));
    return buildingDtoList?.data?.length;
  } catch(error){
    console.error("getBuildingSubscriptionCount error:", error);
    return null
  }
}
export const getLoginMember = async () => {
  try{
    const response = await axiosInstance.get(`/member/getLoginMember`);
    // alert("getLoginMember 응답:"+JSON.stringify(response));
    return response.data.info;
  } catch(error){
    console.error("getLoginMember error:", error);
    // alert("에러났음" + JSON.stringify(error));
    return null;
  }
}