import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../../../assets/css/module/member/PostCode.module.css';
const Postcode = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const previousPage = location.state?.previousPage || '/'; // 기본값을 설정
    const nickname = location.state?.nickname || {};
    const memberId = location.state?.memberId || {};
    const pwd = location.state?.pwd || {};

    console.log('nickname:',nickname);
    console.log('memberId:',memberId);
    console.log('pwd:',pwd);

    const themeObj = {
      bgColor: '#FFFFFF', 
      pageBgColor: '#FFFFFF', 
      postcodeTextColor: '#C05850',
      emphTextColor: '#222222',
    };
  
    const completeHandler = (data) => {
        const { address, zonecode, buildingName, roadAddress } = data;
        console.log(data);
        const fullAddress = `${roadAddress} ${buildingName ? `, ${buildingName}` : ''}`;
        console.log("핸들러"+nickname);
        console.log("핸들러"+memberId);
        console.log("핸들러"+pwd);

        navigate(previousPage, { state: { nickname, memberId, pwd, address: fullAddress, zonecode } });  // 이전 페이지로 돌아가도록 경로 수정
      };
  
    return (
      <div className={styles.container}>
        <DaumPostcode
          theme={themeObj}
          className={styles.postcode}
          onComplete={completeHandler}
        />
      </div>
    );
  };
export default Postcode;
