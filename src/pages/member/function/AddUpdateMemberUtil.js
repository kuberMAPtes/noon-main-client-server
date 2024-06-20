import { login } from "../../../redux/slices/authSlice";
import {
  addMember,
  checkMemberId,
  checkNickname,
  checkPwd,
  getMember,
  checkMemberIdExisted,
} from "./memberAxios";
import {
  validateNickname,
  validateMemberId,
  validatePwd,
  handleChange,
} from "./memberValidator";
import Cookies from "js-cookie";

export const handleKeyDown = (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); // 엔터 키의 기본 동작(폼 제출)을 막음
    // 아무 동작도 하지 않음
  }
};

export const handleNicknameChange = async (
  e,
  setNickname,
  setNicknameValidationMessage,
  setIsNicknameValid
) => {
  console.log("setNickname2", typeof setNickname);
  console.log(
    "setNicknameValidationMessage2",
    typeof setNicknameValidationMessage
  );

  await handleChange(
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

export const handleMemberIdChange = async (
  e,
  setMemberId,
  setMemberIdValidationMessage,
  setIsMemberIdValid
) => {
  await handleChange(
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
export const handleMemberIdChangeExisted = async (
  e,
  setMemberId,
  setMemberIdValidationMessage,
  setIsMemberIdValid
) => {
  //alert("checkMemberIdExisted :: " + checkMemberIdExisted);
  await handleChange(
    e,
    setMemberId,
    validateMemberId,
    checkMemberIdExisted,
    setMemberIdValidationMessage,
    setIsMemberIdValid,
    "",
    ""
  );
};
export const handlePwdChange = (
  e,
  setPwd,
  setPwdValidationMessage,
  setIsPwdValid
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
export const handlePwdConfirmChange = (
  e,
  pwd,
  setPwdConfirm,
  setPwdConfirmValidationMessage,
  setIsPwdConfirmValid
) => {
  const pwdConfirm = e.target.value;
  setPwdConfirm(pwdConfirm);

  if (pwd === pwdConfirm) {
    //pwd와 같은지만 보면 댐
    setPwdConfirmValidationMessage("");
    setIsPwdConfirmValid(true);
  } else {
    setPwdConfirmValidationMessage("위의 비밀번호와 일치하지 않습니다.");
    setIsPwdConfirmValid(false);
  }
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
  form,
  hasNavigated,
  dispatch,
  navigate
) => {
  const phoneNumber = Cookies.get("user-data");

  const fullForm = { ...form, phoneNumber };
  console.log("fullForm:", fullForm);
  //alert("fullform"+JSON.stringify(fullForm));
  const info = await addMember(fullForm);
  //alert("인포"+JSON.stringify(info));
  const loginData = {
    member: { memberId: fullForm.memberId, pwd: fullForm.pwd },
    loginWay: "signUp",
  };

  const { member } = await dispatch(login({ loginData, navigate }));
  //alert("멤버 info 쿠키"+member, info, Cookies.get("AuthToken"));
  console.log("info:", info);
  console.log("Cookies.get(AuthToken):", Cookies.get("AuthToken"));

  if (info === true && Cookies.get("AuthToken")) {
    hasNavigated = true;
    Cookies.remove("addMemberOtherKey"); // 쿠키 삭제
    Cookies.remove("addMemberKey"); // 쿠키 삭제 휴대폰인증할때 받은 회원가입 권한 무효화
    Cookies.remove("user-data"); //휴대폰 번호
    //alert("회원가입이 완료되었습니다.");
    navigate("/member/addMemberResult");
  } else {
    //alert("오류가 발생하였습니다.");
  }
};

export const updateMemberSubmit = async (form, dispatch, navigate) => {};
