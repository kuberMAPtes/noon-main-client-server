import { validateNickname, validateMemberId, validatePassword } from './memberValidator';
import { checkNickname, checkMemberId } from './memberAxios';
import Cookies from 'js-cookie';

// 닉네임 변경 핸들러
export const handleNicknameChange = (setNickname, setNicknameValidationMessage, setIsNicknameValid, checkNicknameAvailability) => async (e) => {
    const value = e.target.value;
    setNickname(value);
    const validationMessage = validateNickname(value);
    setNicknameValidationMessage(validationMessage);
    setIsNicknameValid(!validationMessage);

    if (!validationMessage && value.length >= 2) {
        await checkNicknameAvailability(value);
    }
};

// 계정(ID) 변경 핸들러
export const handleMemberIdChange = (setMemberId, setMemberIdValidationMessage, setIsMemberIdValid, checkMemberIdAvailability) => async (e) => {
    const value = e.target.value;
    setMemberId(value);
    const validationMessage = validateMemberId(value);
    setMemberIdValidationMessage(validationMessage);
    setIsMemberIdValid(!validationMessage);

    if (!validationMessage && value.length >= 6) {
        await checkMemberIdAvailability(value);
    }
};

// 비밀번호 변경 핸들러
export const handlePasswordChange = (setPassword, setPasswordValidationMessage, setIsPasswordValid) => (e) => {
    const value = e.target.value;
    setPassword(value);
    const validationMessage = validatePassword(value);
    setPasswordValidationMessage(validationMessage);
    setIsPasswordValid(!validationMessage);
};

// 주소 변경 핸들러
export const handleAddressChange = (setAddress, setAddressValidationMessage, setIsAddressValid) => (e) => {
    const value = e.target.value;
    setAddress(value);
    const validationMessage = value.trim() !== '' ? '' : '주소를 입력하세요.';
    setAddressValidationMessage(validationMessage);
    setIsAddressValid(!validationMessage);
};

// 서버로 닉네임 중복 체크 요청
export const checkNicknameAvailability = async (nickname, setNicknameValidationMessage, setIsNicknameValid) => {
    try {
        const response = await checkNickname(nickname);
        if (response.exists) {
            setNicknameValidationMessage('이미 존재하는 닉네임입니다.');
            setIsNicknameValid(false);
        } else {
            setNicknameValidationMessage('');
            setIsNicknameValid(true);
        }
    } catch (error) {
        console.error('닉네임 중복 체크 에러:', error);
    }
};

// 서버로 계정(ID) 중복 체크 요청
export const checkMemberIdAvailability = async (memberId, setMemberIdValidationMessage, setIsMemberIdValid) => {
    try {
        const response = await checkMemberId(memberId);
        if (response.exists) {
            setMemberIdValidationMessage('이미 존재하는 계정(ID)입니다.');
            setIsMemberIdValid(false);
        } else {
            setMemberIdValidationMessage('');
            setIsMemberIdValid(true);
        }
    } catch (error) {
        console.error('계정(ID) 중복 체크 에러:', error);
    }
};

// 폼 제출 핸들러
export const handleSubmit = (form, navigate) => (e) => {
    e.preventDefault();
    const { nickname, memberId, password, address } = form;

    const nicknameValidationMessage = validateNickname(nickname);
    const memberIdValidationMessage = validateMemberId(memberId);
    const passwordValidationMessage = validatePassword(password);
    const addressValidationMessage = address.trim() !== '' ? '' : '주소를 입력하세요.';

    const isFormValid = !nicknameValidationMessage && !memberIdValidationMessage && !passwordValidationMessage && !addressValidationMessage;

    if (isFormValid) {
        // 회원가입 처리 로직 추가
        alert('회원가입이 완료되었습니다.');
        Cookies.remove('addMemberKey'); // 쿠키 삭제
        Cookies.remove('addMemberOtherKey'); // 쿠키 삭제
        navigate('/');
    }
    //  else {
    //     setValidationMessages({
    //         nickname: nicknameValidationMessage,
    //         memberId: memberIdValidationMessage,
    //         password: passwordValidationMessage,
    //         address: addressValidationMessage
    //     });
    //     setIsValid({
    //         nickname: !nicknameValidationMessage,
    //         memberId: !memberIdValidationMessage,
    //         password: !passwordValidationMessage,
    //         address: !addressValidationMessage
    //     });
    // }
};
