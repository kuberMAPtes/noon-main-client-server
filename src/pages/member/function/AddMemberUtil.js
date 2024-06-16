import { checkMemberId, checkNickname, checkPassword } from './memberAxios';
import { validateNickname, validateMemberId, validatePassword } from './memberValidator';
import Cookies from 'js-cookie';
export const handleNicknameChange = async (
    e
    ,setNickname
    , setNicknameValidationMessage
    , setIsNicknameValid)=>{
        //닉네임이 변할때마다 검사를 해야지
        const input = e.target.value;
        setNickname(input);
            if(validateNickname(input)){
                const response = await checkNickname(input);

                if(response.info===true){
                    console.log("성공 response",response);
                    setNicknameValidationMessage("");
                    setIsNicknameValid(true);
                }else{
                    console.log("실패 resonse",response);
                    setNicknameValidationMessage(response.message);
                    setIsNicknameValid(false);
                }

            }else{
            setNicknameValidationMessage("닉네임 : 자음과 모음이 반드시 결합, 2~20자");
            setIsNicknameValid(false);
        }
}

export const handleMemberIdChange = async (
    e
    ,setMemberId
    , setMemberIdValidationMessage
    , setIsMemberIdValid)=>{
        const input = e.target.value;
        setMemberId(input);
            if(validateMemberId(input)){
                const response = await checkMemberId(input);
                if(response.info===true){
                    setMemberIdValidationMessage("");
                    setIsMemberIdValid(true);
                }else{
                    setMemberIdValidationMessage(response.message);
                    setIsMemberIdValid(false);
                }

            }else{
            setMemberIdValidationMessage("계정ID : 영어와 숫자가 반드시 결합, 6~24자, 첫 글자가 영어로 시작");
            setIsMemberIdValid(false);
        }
}
 

export const handlePasswordChange = async (
    e
    ,setPassword
    , setPasswordValidationMessage
    , setIsPasswordValid)=>{
        const input = e.target.value;
        setPassword(input);
        if(validatePassword(input)){
            setPasswordValidationMessage("");
            setIsPasswordValid(true);
        }else{
            setPasswordValidationMessage("비밀번호는 8자 이상 16자 이하로 입력하세요.");
            setIsPasswordValid(false);
        }
    }
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
        navigate('/addMemberResult');
    }
};
    
export const detailedAddressChangeHandler = (e,setDetailedAddress) => {
    setDetailedAddress(e.target.value);
  };

export const redirectToPostcode = (navigate,location) => {
    //postcode컴포넌트의 location.state에 previousPage를 담음
    navigate('/member/postcode', { state: { previousPage: location.pathname } });
};