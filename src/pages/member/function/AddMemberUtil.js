import { login } from '../../../redux/slices/authSlice';
import { addMember, checkMemberId, checkNickname, checkPwd, getMember } from './memberAxios';
import { validateNickname, validateMemberId, validatePwd } from './memberValidator';
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
 

export const handlePwdChange = async (
    e
    ,setPwd
    , setPwdValidationMessage
    , setIsPwdValid)=>{
        const input = e.target.value;
        setPwd(input);
        if(validatePwd(input)){
            setPwdValidationMessage("");
            setIsPwdValid(true);
        }else{
            setPwdValidationMessage("비밀번호는 8자 이상 16자 이하로 입력하세요.");
            setIsPwdValid(false);
        }
    }
export const handleSubmit = (form, navigate) => (e) => {
    e.preventDefault();
    const { nickname, memberId, pwd, address } = form;

    const nicknameValidationMessage = validateNickname(nickname);
    const memberIdValidationMessage = validateMemberId(memberId);
    const pwdValidationMessage = validatePwd(pwd);
    const addressValidationMessage = address?.trim() !== '' ? '' : '주소를 입력하세요.';

    const isFormValid = !nicknameValidationMessage && !memberIdValidationMessage && !pwdValidationMessage && !addressValidationMessage;

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

export const redirectToPostcode = (memberId,nickname,pwd,navigate,location) => {
    //postcode컴포넌트의 location.state에 previousPage를 담음
    navigate('/member/postcode', { state: { memberId, nickname, pwd, previousPage: location.pathname } });
};

export const handleAddMember = async (form, dispatch, navigate) => {

    const phoneNumber = Cookies.get('user-data');
    Cookies.remove('user-data');//휴대폰 번호
    
    const fullForm = { ...form, phoneNumber };
    console.log('fullForm:',fullForm);

    const info = await addMember(fullForm);
    Cookies.remove('addMemberKey'); // 쿠키 삭제 휴대폰인증할때 받은 회원가입 권한 무효화
    Cookies.remove('addMemberOtherKey'); // 쿠키 삭제
    const loginData = {
        member : {memberId :  fullForm.memberId, pwd: fullForm.pwd}
        ,loginWay : "signUp"}

    await dispatch(login({loginData,navigate}));
    
    

    console.log('info:',info);
    console.log('Cookies.get(AuthToken):',Cookies.get('AuthToken'));


    if(info===true && Cookies.get('AuthToken')){
        alert('회원가입이 완료되었습니다.');
        navigate('/member/addMemberResult');
    }else{
        alert("오류가 발생하였습니다.")
    }

} 