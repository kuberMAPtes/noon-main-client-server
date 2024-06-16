import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../../../assets/css/module/member/PostCode.module.css';
const Postcode = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const previousPage = location.state?.previousPage || '/'; // 기본값을 설정

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
        navigate(previousPage, { state: { address: fullAddress, zonecode } });  // 이전 페이지로 돌아가도록 경로 수정
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
