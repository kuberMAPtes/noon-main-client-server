import { useState, useRef } from 'react';
import { updateMember } from '../../function/memberAxios';

//value는 
const useReadOnlyInput = (initialValue,isNicknameValid,memberId) => {
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef(null);

  const handleClick = () => {
    setIsReadOnly(false);
    inputRef.current.focus();
  };

  const handleBlur = (originalValue) => async (e) => {
    setIsReadOnly(true);
    // alert(e.target.value+"@@ "+originalValue+" @@"+isNicknameValid+"@@ "+memberId);
    if (e.target.value !== originalValue && e.target.value !== '' && isNicknameValid === true) {
      await updateMember({ nickname: e.target.value, memberId: memberId})
    }
  };


  return {
    value,
    isReadOnly,
    inputRef,
    handleClick,
    handleBlur,
  };
};

export default useReadOnlyInput;
