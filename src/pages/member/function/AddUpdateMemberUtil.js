import { login } from "../../../redux/slices/authSlice";
import {
  addMember,
  checkMemberId,
  checkNickname,
  checkPwd,
  getMember,
} from "./memberAxios";
import {
  validateNickname,
  validateMemberId,
  validatePwd,
  handleChange,
} from "./memberValidator";
import Cookies from "js-cookie";


export const handleNicknameChange = (
  e,
  setNickname,
  setNicknameValidationMessage,
  setIsNicknameValid
) => {
    console.log("setNickname2", typeof setNickname);
    console.log("setNicknameValidationMessage2", typeof setNicknameValidationMessage);
     
  handleChange(
    e,
    setNickname,
    validateNickname,
    checkNickname,
    setNicknameValidationMessage,
    setIsNicknameValid,
    "",
    "닉네임 : 자음과 모음이 반드시 결합, 2~20자"
  );
};

export const handleMemberIdChange = (
  e
  ,setMemberId
  ,setMemberIdValidationMessage
  ,setIsMemberIdValid
) => {
  handleChange(
    e,
    setMemberId,
    validateMemberId,
    checkMemberId,
    setMemberIdValidationMessage,
    setIsMemberIdValid,
    "",
    "계정ID : 영어와 숫자가 반드시 결합, 6~24자, 첫 글자가 영어로 시작"
  );
};

export const handlePwdChange = (
  e
  ,setPwd
  ,setPwdValidationMessage
  ,setIsPwdValid
) => {
  handleChange(
    e,
    setPwd,
    validatePwd,
    null, // checkFunction이 필요하지 않으므로 null을 전달
    setPwdValidationMessage,
    setIsPwdValid,
    "",
    "비밀번호는 8자 이상 16자 이하로 입력하세요."
  );
};



export const detailedAddressChangeHandler = (e, setDetailedAddress) => {
  setDetailedAddress(e.target.value);
};

export const redirectToPostcode = (
  memberId,
  nickname,
  pwd,
  navigate,
  location
) => {
  //postcode컴포넌트의 location.state에 previousPage를 담음
  navigate("/member/postcode", {
    state: { memberId, nickname, pwd, previousPage: location.pathname },
  });
};

export const addMemberSubmit = async (
    form
    , hasNavigated
    , dispatch
    , navigate) => {
  const phoneNumber = Cookies.get("user-data");
  

  const fullForm = { ...form, phoneNumber };
  console.log("fullForm:", fullForm);

  const info = await addMember(fullForm);
  const loginData = {
    member: { memberId: fullForm.memberId, pwd: fullForm.pwd },
    loginWay: "signUp",
  };

  await dispatch(login({ loginData, navigate }));

  console.log("info:", info);
  console.log("Cookies.get(AuthToken):", Cookies.get("AuthToken"));

  if (info === true && Cookies.get("AuthToken")) {
    hasNavigated = true;
    Cookies.remove("addMemberOtherKey"); // 쿠키 삭제
    Cookies.remove("addMemberKey"); // 쿠키 삭제 휴대폰인증할때 받은 회원가입 권한 무효화
    Cookies.remove("user-data"); //휴대폰 번호
    alert("회원가입이 완료되었습니다.");
    navigate("/member/addMemberResult");

  } else {
    alert("오류가 발생하였습니다.");
  }
};

export const updateMemberSubmit = async (
    form
    , dispatch
    , navigate) => {

    }