import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/slices/authSlice';
import LoginForm from './component/LoginForm';
import styles from '../../assets/css/module/member/GetAuthMain.module.css';
import { Container, Button, Row, Col, Spinner, Alert } from 'react-bootstrap';

const GetAuthMain = () => {
  const dispatch = useDispatch();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const loginStatus = useSelector((state) => state.loginStatus);
  const loginError = useSelector((state) => state.loginError);
  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  const handleKakaoLogin = (event) => {
    event.preventDefault();
    console.log('카카오 로그인 버튼 클릭');
    const redirectUri = process.env.REACT_APP_MEMBER_API_BASE_URL + '/kakaoLogin';
    console.log('redirectUri :: ', redirectUri);
    const encodedUri = encodeURIComponent(redirectUri);
    console.log(encodedUri);
    const clientId = process.env.REACT_APP_KAKAO_API_KEY;
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodedUri}`;
  };

  const handleLoginClick = () => {
    setShowLoginForm(true);
  };

  const handleLoginSubmit = (loginData) => {
    dispatch(login(loginData));
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center">회원가입 / 로그인</h1>
      <Row className="justify-content-center">
        <Col md={6} className="text-center">
          <Button
            onClick={handleKakaoLogin}
            className={`${styles['no-button-style']} mb-3`}
            variant="light"
          >
            <img
              src="/image/kakao_login_medium_narrow.png"
              alt="카카오 로그인"
              className="img-fluid"
            />
          </Button>
          <Button onClick={handleLoginClick} variant="primary" className="mb-3">
            일반 로그인
          </Button>
          {loginStatus === 'loading' && <Spinner animation="border" />}
          {loginStatus === 'failed' && (
            <Alert variant="danger">로그인 실패: {loginError}</Alert>
          )}
          {isAuthenticated && <Alert variant="success">로그인 성공!</Alert>}
        </Col>
      </Row>
      {showLoginForm && <LoginForm onSubmit={handleLoginSubmit} />}
    </Container>
  );
};

export default GetAuthMain;
