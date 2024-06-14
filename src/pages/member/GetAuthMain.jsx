import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, setMember } from '../../redux/slices/authSlice';
import LoginForm from './component/LoginForm';
import styles from '../../assets/css/module/member/GetAuthMain.module.css';
import { Container, Button, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { handleKakaoLogin } from './function/kakaoLogin';
import { initializeFirebase } from '../../firebase';
import { handleGoogleLogin, checkRedirectResult } from './function/googleLogin';
import { useNavigate } from 'react-router-dom';

const GetAuthMain = () => {
  console.log("#### GetAuthMain 컴포넌트 초기화 시작");

  const dispatch = useDispatch();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [googleAuth, setGoogleAuth] = useState(null);
  const authorization = useSelector((state) => state.auth.authorization);
  const loginStatus = useSelector((state) => state.auth.loginStatus);
  const loginError = useSelector((state) => state.auth.loginError);

  const navigate = useNavigate();

  console.log("초기 상태 - showLoginForm:", showLoginForm);
  console.log("초기 상태 - googleAuth:", googleAuth);

  // 일반 로그인 폼 보여주기
  const handleLoginClick = () => {
    console.log("$$$$ 일반 로그인 버튼 클릭");
    setShowLoginForm(true);
  };

  // 일반 로그인 수행
  const handleLoginSubmit = (loginData) => {
    console.log("$$$$ 일반 로그인 폼 제출 - loginData:", loginData);
    dispatch(login(loginData));
  };

  // 처음 리다이렉트 될 때 딱 한번만 수행한다.
  useEffect(() => {
    console.log("@@@@ GetAuthMain useEffect - checkRedirectResult 호출");

    const getResult = async () => {
      console.log("$$$$ getResult 함수 시작");
      const result = await checkRedirectResult(dispatch);
      console.log("checkRedirectResult 결과:", result);
      if (result) {
        console.log("로그인 성공 - 회원 정보 설정:", result);
        dispatch(setMember(result));    
      }
    };
    getResult();


  }, [dispatch]);

//   useEffect(() => {
//     console.log("useEffect - member 상태 변경");
//     console.log("현재 member 상태:", auth.member);
//     if (auth.member && auth.member.memberId) {
//       console.log("로그인된 사용자, 프로필 페이지로 리디렉션");
//       navigate(`/member/getMemberProfile/${auth.member.memberId}`);
//     }
//   }, [auth, navigate]);

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
          <Button onClick={()=>handleGoogleLogin(dispatch)} variant="danger" className="mb-3">
            구글 로그인
          </Button>
          <Button onClick={handleLoginClick} variant="primary" className="mb-3">
            일반 로그인
          </Button>
          {loginStatus === 'loading' && <Spinner animation="border" />}
          {loginStatus === 'failed' && (
            <Alert variant="danger">로그인 실패: {loginError}</Alert>
          )}
          {authorization && <Alert variant="success">로그인 성공!</Alert>}
        </Col>
      </Row>
      {showLoginForm && <LoginForm onSubmit={handleLoginSubmit} />}
    </Container>
  );
};

export default GetAuthMain;
