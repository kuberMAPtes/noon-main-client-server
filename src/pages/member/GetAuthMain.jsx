import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../../redux/slices/authSlice';
import LoginForm from './component/LoginForm';
import styles from '../../assets/css/module/member/GetAuthMain.module.css';
import { Container, Button, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { handleKakaoLogin } from './function/kakaoLogin';
import { initializeFirebase } from '../../firebase';
import { handleRedirectResult, setupAuthStateListener } from './function/googleLogin';

const GetAuthMain = () => {
  const dispatch = useDispatch();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [googleAuth, setGoogleAuth] = useState(null);
  const [member, setMember] = useState(null);
  const loginStatus = useSelector((state) => state.loginStatus);
  const loginError = useSelector((state) => state.loginError);
  const token = useSelector((state) => state.token);

  //일반 로그인 폼 보여주기
  const handleLoginClick = () => {
    setShowLoginForm(true);
  };
  //일반 로그인 수행
  const handleLoginSubmit = (loginData) => {
    dispatch(login(loginData));
  };

  ///구글 로그인
  const handleGoogleLogin = async () => {
    if (!googleAuth) {
      const authInstance = await initializeFirebase();
      setGoogleAuth(authInstance);
      authInstance.languageCode = "ko";

      const unsubscribe = setupAuthStateListener(authInstance, (loginData) => dispatch(login(loginData)), () => dispatch(logout()));
      return () => unsubscribe();
    }
  };

  useEffect(() => {
    if (googleAuth) {
      handleRedirectResult(googleAuth, setMember);
    }
  }, [googleAuth]);

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
          <Button onClick={handleGoogleLogin} variant="danger" className="mb-3">
            구글 로그인
          </Button>
          <Button onClick={handleLoginClick} variant="primary" className="mb-3">
            일반 로그인
          </Button>
          {loginStatus === 'loading' && <Spinner animation="border" />}
          {loginStatus === 'failed' && (
            <Alert variant="danger">로그인 실패: {loginError}</Alert>
          )}
          {token && <Alert variant="success">로그인 성공!</Alert>}
        </Col>
      </Row>
      {showLoginForm && <LoginForm onSubmit={handleLoginSubmit} />}
    </Container>
  );
};

export default GetAuthMain;
