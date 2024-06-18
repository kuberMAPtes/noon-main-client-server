import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleKakaoLogin } from '../function/kakaoLogin';
import { handleGoogleLogin } from '../function/googleLogin';
import SignUpButton from './SignUpButton';
import styles from '../../../assets/css/module/member/LoginButtons.module.css';
import { Container, Row, Col, Button,Spinner } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import GoogleLogo from './GoogleLogo'; // SVG 컴포넌트 임포트
import KakaoLogo from './KakaoLogo';
import NoonLogo from '../../../assets/css/NoonLogo';
import { Link } from 'react-router-dom';
const LoginButtons = ({ onLoginClick }) => {
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.auth.loginStatus);
//   const authorization = useSelector((state) => state.auth.authorization);

  return (

    <Container className={styles.loginButtons}>
    <Row className="justify-content-center">
      <Col xs={12} md={8} lg={6} className="text-center">
        <div className={styles.logo}>
            <NoonLogo/>
        </div>
        <Button variant="warning"
        className={styles.loginButton}
        onClick={handleKakaoLogin} >
          <KakaoLogo className="me-2"/> 카카오로 시작하기
        </Button>
        <hr />
        <Button
        variant="light"
        className={styles.loginButton}
        onClick={() => handleGoogleLogin(dispatch)}>
          <GoogleLogo className="me-2"/>Google로 시작하기
        </Button>
        <hr />
        <Button
        variant="success"
        className={`d-flex align-items-center justify-content-center ${styles.loginButton} ${styles.customButton}`}
        onClick={onLoginClick}>
          계정 ID로 시작하기
        </Button>
        <hr />
        <SignUpButton />
        <hr />
        <Link 
        to="/member/addPhoneNumberAuthentification/updateMember"
        style={{ fontSize : '0.6rem'}}
        >아이디 찾기</Link>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link 
        to="/member/UpdatePassword"
        style={{ fontSize : '0.6rem'}}
        >비밀번호 재설정</Link>
      </Col>
    </Row>
    <Row className="justify-content-center">
      <Col xs={12} md={8} lg={6} className="text-center">
        <div className={styles.welcomeBanner}>
          국내 최초 건물 기반 SNS <br/> 우리 같이 놀아요!
        </div>
      </Col>
    </Row>
    {loginStatus === 'loading' && <Spinner animation="border" />}
  </Container>
  );
};

export default LoginButtons;
