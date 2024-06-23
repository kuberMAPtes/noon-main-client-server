import { useState, useRef } from 'react';

//value는 
const useReadOnlyInput = (initialValue) => {
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef(null);

  const handleDoubleClick = () => {
    setIsReadOnly(false);
    inputRef.current.focus();
  };

  const handleBlur = (originalValue) => (e) => {
    if (e.target.value === originalValue || e.target.value === '') {
      setIsReadOnly(true);
    }
  };


  return {
    value,
    isReadOnly,
    inputRef,
    handleDoubleClick,
    handleBlur,
  };
};

export default useReadOnlyInput;
