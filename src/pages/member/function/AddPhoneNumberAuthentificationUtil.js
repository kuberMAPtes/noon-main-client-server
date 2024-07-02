import { encryptWithLv } from "../../../util/crypto";
import {
  checkPhoneNumber,
  checkPhoneNumberAndMemberId,
  confirmAuthentificationNumber,
  sendAuthentificationNumber,
  getMemberIdByPhoneNumber,
} from "./memberAxios";
import { validatePhoneNumber } from "./memberValidator";
import Cookies from "js-cookie";
// utils.js

// 전화번호 포맷 생성
export const formatPhoneNumber = (input) => {
  const cleaned = ("" + input).replace(/\D/g, "");
  let formatted = cleaned;
  if (cleaned.length > 3 && cleaned.length <= 7) {
    formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
  } else if (cleaned.length > 7) {
    formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(
      7,
      11
    )}`;
  }
  return formatted;
};

// 전화번호 입력
export const handlePhoneNumberChange = async (
  e,
  setPhoneNumber,
  setPhoneNumberValidationMessage,
  setIsPhoneNumberValid,
  toUrl
) => {
  const input = e.target.value;
  const formattedPhoneNumber = formatPhoneNumber(input);
  setPhoneNumber(formattedPhoneNumber);

  if (formattedPhoneNumber.length === 13) {
    if (toUrl === "addMember") {
      const response = await checkPhoneNumber(formattedPhoneNumber);
      // const response = { info: true };

      if (!validatePhoneNumber(formattedPhoneNumber)) {
        setPhoneNumberValidationMessage("유효하지 않은 전화번호 형식입니다.");
        setIsPhoneNumberValid(false);
      } else if (response.info !== true) {
        console.log("response", response);
        setPhoneNumberValidationMessage(response.message);
        setIsPhoneNumberValid(false);
      } else {
        setPhoneNumberValidationMessage("");
        setIsPhoneNumberValid(true);
      }
    } else if (toUrl === "getMemberId") {
      const response = await getMemberIdByPhoneNumber(formattedPhoneNumber);

      if (!validatePhoneNumber(formattedPhoneNumber)) {
        setPhoneNumberValidationMessage("유효하지 않은 전화번호 형식입니다.");
        setIsPhoneNumberValid(false);
      } else {
        if (response !== false) {
          console.log("response :: 휴대폰번호로 멤버Id 찾기 성공", response);
          setPhoneNumberValidationMessage("");
          setIsPhoneNumberValid(true);
        } else {
          console.log("response :: 휴대폰번호로 멤버Id 찾기 실패", response);
          setPhoneNumberValidationMessage("가입하지 않은 전화번호입니다.");
          setIsPhoneNumberValid(false);
        }
      }
    } else if (toUrl === "updatePwd") {
      const memberId = sessionStorage.getItem("w");
      const response = await checkPhoneNumberAndMemberId(
        memberId,
        formattedPhoneNumber
      );
      if (response.info === true) {
        setPhoneNumberValidationMessage("");
        setIsPhoneNumberValid(true);
      } else {
        setPhoneNumberValidationMessage(
          "회원정보에 등록한 휴대전화번호와 다릅니다."
        );
        setIsPhoneNumberValid(false);
      }
    }
  } else {
    setPhoneNumberValidationMessage("");
    setIsPhoneNumberValid(false);
  }
};

// 인증번호 입력
export const handleAuthNumberChange = (e, setAuthNumber) => {
  const input = e.target.value.replace(/\D/g, "");
  if (input.length <= 4) {
    setAuthNumber(input);
  }
};

// 인증번호 전송
export const handleSendClick = async (
  phoneNumber,
  setPhoneNumberValidated,
  setCertificationRequested,
  setTimeLeft,
  setIsRunning
) => {
  const response = await sendAuthentificationNumber(phoneNumber);
  // if (validatePhoneNumber(phoneNumber)) {
  // }
  console.log("handleSendClick에서 response 좀 보자", response);
  if (response.info) {
    setCertificationRequested(true);
    setTimeLeft(180);
    setIsRunning(true);
  } else {
    setPhoneNumberValidated("유효하지 않은 전화번호 형식입니다.");
  }
};

// 인증번호 확인
export const checkAuthNumber = async (
  phoneNumber,
  authNumber,
  setIsVerified,
  setFailCount
) => {
  if (authNumber.length === 4) {
    try {
      const response = await confirmAuthentificationNumber(
        phoneNumber,
        authNumber
      );
      if (response.info) {
        setIsVerified("success");
      } else {
        setIsVerified("fail");
        setFailCount((prevCount) => prevCount + 1);
      }
    } catch (error) {
      console.error("인증번호 확인 실패:", error);
      setIsVerified("fail");
      setFailCount((prevCount) => prevCount + 1);
    }
  }
};
// 시간 포맷
export const formatTime = (seconds) => {
  const min = Math.floor(seconds / 60);
  const remainingSec = seconds % 60;
  return `${min}:${remainingSec < 10 ? `0${remainingSec}` : remainingSec}`;
};

// 인증 성공시 페이지 이동
export const handleNavigate = (phoneNumber, verifiedState, navigate, url) => {
  if (verifiedState === "success") {
    if (url === "addMember") {
      const { encryptedData, ivData } = encryptWithLv("success");
      Cookies.set("addMemberKey", encryptedData);
      Cookies.set("addMemberOtherKey", ivData);
      Cookies.set("user-data", phoneNumber);
    }
    //getMemberId라면 memberId를 가져와서 url에 붙여준다.
    const getMemberIdByPhoneNum = async () => {
      if (url === "addMember") {
      } else if (url === "getMemberId") {
        const response = await getMemberIdByPhoneNumber(phoneNumber);
        if (response) {
          url = url + "/" + response; //getMemberId/:memberId
        } else {
          url = url + "/fail";
        }
      } else if (url === "updatePwd") {
        
      }
      alert("네비게이션 합니다 " + url);
      navigate("/member/" + url);
    };

    getMemberIdByPhoneNum();
  }
};
