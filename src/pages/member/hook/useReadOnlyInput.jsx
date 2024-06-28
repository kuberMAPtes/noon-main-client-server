import { useState, useRef, useCallback, useEffect } from 'react';
import { updateMember } from '../function/memberAxios';

const useReadOnlyInput = (
  initialValue,
  isValueValid,
  memberId,
  profile,
  setProfile,
  profileDataType
) => {
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef(null);
  const [shouldUpdate, setShouldUpdate] = useState(false);

  const handleClick = useCallback(() => {
    setIsReadOnly(false);
    inputRef.current.focus();
  }, []);

  const handleBlur = useCallback((originalValue) => (e) => {
    setIsReadOnly(true);
    const newValue = e.target.value;
    
    if (newValue !== originalValue && newValue !== '' && isValueValid) {
      setValue(newValue);
      setShouldUpdate(true);
    }
  }, [isValueValid]);

  useEffect(() => {
    if (shouldUpdate) {
      const updateProfile = async () => {
        // alert("업데이트 axios 실행");
        await updateMember({ [profileDataType]: value, memberId: memberId });
        setProfile(prev => ({ ...prev, [profileDataType]: value }));
      };
      
      updateProfile();
      setShouldUpdate(false);
    }
  }, [shouldUpdate, value, profileDataType, memberId, setProfile]);

  return {
    value,
    isReadOnly,
    inputRef,
    handleClick,
    handleBlur,
  };
};

export default useReadOnlyInput;