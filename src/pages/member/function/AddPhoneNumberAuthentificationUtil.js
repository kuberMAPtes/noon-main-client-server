import { confirmAuthentificationNumber, sendAuthentificationNumber } from "./memberAxios";
import { validatePhoneNumber } from "./memberValidator";

// utils.js
export const formatPhoneNumber = (input) => {
    const cleaned = ('' + input).replace(/\D/g, '');
    let formatted = cleaned;
    if (cleaned.length > 3 && cleaned.length <= 7) {
      formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    } else if (cleaned.length > 7) {
      formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7, 11)}`;
    }
    return formatted;
  };
  
  export const handlePhoneNumberChange = (e, setPhoneNumber, setPhoneNumberError, setIsPhoneNumberValid) => {
    const input = e.target.value;
    const formattedPhoneNumber = formatPhoneNumber(input);
    setPhoneNumber(formattedPhoneNumber);
  
    if (formattedPhoneNumber.length === 13) {
      if (!validatePhoneNumber(formattedPhoneNumber)) {
        setPhoneNumberError('유효하지 않은 전화번호 형식입니다.');
        setIsPhoneNumberValid(false);
      } else {
        setPhoneNumberError("");
        setIsPhoneNumberValid(true);
      }
    } else {
      setPhoneNumberError("");
      setIsPhoneNumberValid(false);
    }
  };
  
  export const handleAuthNumberChange = (e, setAuthNumber) => {
    const input = e.target.value.replace(/\D/g, '');
    if (input.length <= 4) {
      setAuthNumber(input);
    }
  };
  
  export const handleSendClick = async (phoneNumber, setPhoneNumberError,setCertificationRequested,setTimeLeft,setIsRunning) => {
        const response = await sendAuthentificationNumber(phoneNumber);
        if (validatePhoneNumber(phoneNumber)) {
        }
        console.log("handleSendClick에서 response 좀 보자",response);
        if(response.info){
            setCertificationRequested(true);
            setTimeLeft(180);
            setIsRunning(true);
        }else {
        setPhoneNumberError('유효하지 않은 전화번호 형식입니다.');
        }   
  };
  export const checkAuthNumber = async (phoneNumber, authNumber, setIsVerified, setFailCount) => {
    if (authNumber.length === 4) {
      try {
        const response = await confirmAuthentificationNumber(phoneNumber, authNumber);
        if (response.info) {
          setIsVerified("success");
        } else {
          setIsVerified("fail");
          setFailCount(prevCount => prevCount + 1);
        }
      } catch (error) {
        console.error("인증번호 확인 실패:", error);
        setIsVerified("fail");
        setFailCount(prevCount => prevCount + 1);
      }
    }
  };
  export const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const remainingSec = seconds % 60;
    return `${min}:${remainingSec < 10 ? `0${remainingSec}` : remainingSec}`;
  }
  export const handleNavigate = (navigate) => {
    navigate("/member/addMember");
  }