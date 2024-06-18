import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { decryptWithIv, encryptWithLv } from '../../../../util/crypto';
import styles from './B.module.css'; 
import { FaArrowLeft, FaGoogle, FaApple } from 'react-icons/fa';
import { SiNaver } from 'react-icons/si';
import { RiKakaoTalkFill } from 'react-icons/ri'; // Kakao icon
import GoogleLogo from '../../component/GoogleLogo'; // SVG 컴포넌트 임포트
import KakaoLogo from '../../component/KakaoLogo';
const LoginPage = () => {
  return (
    <Container className={styles.loginPage}>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6} className="text-center">
          <Button variant="link" className={styles.backButton}>
            <FaArrowLeft /> 로그인
          </Button>
          <div className={styles.logo}>
            <img src="path_to_logo_image" alt="yanolja" />
          </div>
          <Button variant="warning" className={styles.loginButton} >
            <KakaoLogo className="me-2"/> 카카오로 시작하기
          </Button>
          <hr />
          <Button variant="light" className={styles.loginButton}>
            <GoogleLogo className="me-2"/> nbsp; Google로 시작하기
          </Button>
          <hr />
          <Button variant="success" className={`d-flex align-items-center justify-content-center ${styles.loginButton} ${styles.customButton}`}>
            계정 ID로 시작하기
          </Button>
          <hr />
          <Button variant="success" className={`d-flex align-items-center justify-content-center ${styles.loginButton} ${styles.customButton}`}>
            회원가입하기
          </Button>
          <hr />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6} className="text-center">
          <div className={styles.welcomeBanner}>
            국내 최초 건물 기반 SNS <br/> 우리 같이 놀아요!
          </div>
        </Col>
      </Row>
    </Container>
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
      <LoginPage />
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
