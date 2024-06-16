import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { useNavigate } from 'react-router-dom';

const PostcodePage = () => {
  const [zonecode, setZonecode] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const themeObj = {
    bgColor: '#FFFFFF', 
    pageBgColor: '#FFFFFF', 
    postcodeTextColor: '#C05850',
    emphTextColor: '#222222',
  };

  const postCodeStyle = {
    width: '360px',
    height: '480px',
  };

  const completeHandler = (data) => {
    const { address, zonecode } = data;
    setZonecode(zonecode);
    setAddress(address);
    navigate('/', { state: { address, zonecode } });
  };

  return (
    <div>
      <DaumPostcode
        theme={themeObj}
        style={postCodeStyle}
        onComplete={completeHandler}
      />
    </div>
  );
};

export default PostcodePage;
