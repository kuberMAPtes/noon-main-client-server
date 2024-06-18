// src/utils/memberValidator.js

const PHONE_NUMBER_PATTERN = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
const NICKNAME_PATTERN = /^[a-zA-Z0-9가-힣_ ]{2,20}$/;
const MEMBER_ID_PATTERN = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z][a-zA -Z0-9_]{6,40}$/;

const PWD_PATTERN = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9!@#\$%\^&\*_]{8,16}$/;
const SEQUENTIAL_PATTERN = /(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|cba|dcb|edc|fed|gfe|hgf|ihg|jih|kji|lkj|mlk|nml|onm|pon|qpo|rqp|srq|tsr|uts|vut|wvu|yxw|zyx|123|234|345|456|567|678|789|890|012|321|432|543|654|765|876|987|098|210)/;

export const validatePhoneNumber = (phoneNumber) => {
  return PHONE_NUMBER_PATTERN.test(phoneNumber);
};

export const validateNickname = (nickname) => {
  return NICKNAME_PATTERN.test(nickname);
};

export const validateMemberId = (memberId) => {
  return MEMBER_ID_PATTERN.test(memberId);
};

export const validatePwd = (pwd) => {
  return PWD_PATTERN.test(pwd);
};

export const containsSequentialPattern = (input) => {
  return SEQUENTIAL_PATTERN.test(input);
};

export const validateLoginForm = (memberId, pwd) => {
  if (!validateMemberId(memberId)) {
    return "유효하지 않은 회원 ID입니다. 6-64자의 영문자, 숫자, 또는 _@를 포함해야 합니다.";
  }

  if (!validatePwd(pwd)) {
    return "유효하지 않은 비밀번호입니다. 8-16자의 영문자와 숫자를 포함해야 합니다.";
  }

  if (containsSequentialPattern(pwd)) {
    return "비밀번호에 3번 이상 연속된 문자열이 포함될 수 없습니다.";
  }

  return null;
};

export const handleChange = async (
    e,
    setState,
    validateFunction,
    checkFunction,
    validationMessageSetter,
    validitySetter,
    successMessage = "",
    failureMessage = ""
) => {
    const input = e.target.value;
    setState(input);

    if (validateFunction(input)) {
        if (checkFunction) {
            const response = await checkFunction(input);
            if (response.info === true) {
                validationMessageSetter(successMessage);
                validitySetter(true);
            } else {
                validationMessageSetter(response.message);
                validitySetter(false);
            }
        } else {
            validationMessageSetter(successMessage);
            validitySetter(true);
        }
    } else {
        validationMessageSetter(failureMessage);
        validitySetter(false);
    }
};