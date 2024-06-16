import React, { useState,useEffect } from 'react';
import { encryptWithLv, decryptWithIv } from '../../../../util/crypto';
import { useLocation, useNavigate } from 'react-router-dom';


const C = (props) => {
    const [zonecode, setZonecode] = useState('');
    const [address, setAddress] = useState('');
    const [detailedAddress, setDetailedAddress] = useState('');

  
    const navigate = useNavigate();
    const location = useLocation();
  
    useEffect(() => {
        if (location.state && location.state.zonecode && location.state.address){
        setZonecode(location.state.zonecode);
        setAddress(location.state.address);
      }
    }, [location.state]);
  
    const inputChangeHandler = (event) => {
      setDetailedAddress(event.target.value);
    };
  
    const redirectToPostcode = () => {
        //postcode컴포넌트의 location.state에 previousPage를 담음
        navigate('/member/postcode', { state: { previousPage: location.pathname } });
      };
  
    return (
      <div>
        <div>
          <strong>address</strong>
        </div>
        <div>
          <div>
            <div>{zonecode}</div>
            <button type="button" onClick={redirectToPostcode}>
              주소 찾기
            </button>
          </div>
          <div>{address}</div>
          <input value={detailedAddress} onChange={inputChangeHandler} />
        </div>
      </div>
    );
  };

///////////////////////////////////////////////////////////////////////////////////////
const B = () => {
  const [count, setCount] = useState(0);

  console.log('B component render');

  useEffect(() => {
    console.log('B component useEffect');
  }, [count]);
//console 먼저 하고 return 안에 있는거 하고 useEffect한다.
  return (
    <div>
      Component B
      <button onClick={() => setCount(count + 1)}>Increment B</button>
      <C />
    </div>
  );
};
////////////////////////////////////////////////////////////////////////////
const A = () => {
    const a = decryptWithIv("8IJUIOQeTJF8VIvZ+l7mYg==","dyj8n7eNe4QSotOSIMki7w==")//데이터 IV 키
    console.log("A렌더링 디코딩 결과"+a);

    const b = "wschoi809@naver.com";
    console.log("인코딩전",b);
    const {encryptedData,ivData} = encryptWithLv(b);
    console.log("인코딩후"+encryptedData, ivData);
    const d = decryptWithIv(encryptedData,ivData);
    console.log("디코딩후",d);
  useEffect(() => {
    console.log('A component useEffect');
  });

  return (
    <div>
      Component A
      <B />
    </div>
  );
};

export default A;
