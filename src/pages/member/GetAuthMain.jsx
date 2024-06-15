import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, setMember } from '../../redux/slices/authSlice';
import LoginForm from './component/LoginForm';
import styles from '../../assets/css/module/member/GetAuthMain.module.css';
import { Container, Button, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { handleKakaoLogin } from './function/kakaoLogin';
import { handleGoogleLogin, checkRedirectResult } from './function/googleLogin';
import SignUpButton from './component/SignUpButton';
import { useNavigate } from 'react-router-dom';
import LoginButtons from './component/LoginButtons';

const GetAuthMain = () => {
  console.log("#### GetAuthMain 컴포넌트 초기화 시작");

  const dispatch = useDispatch();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const loginStatus = useSelector((state) => state.auth.loginStatus);
  const loginError = useSelector((state) => state.auth.loginError);

  const navigate = useNavigate();

  console.log("초기 상태 - showLoginForm:", showLoginForm);

  const handleLoginClick = () => {
    console.log("$$$$ 일반 로그인 버튼 클릭");
    setShowLoginForm(true);
  };

  const handleLoginSubmit = (loginData) => {
    console.log("$$$$ 일반 로그인 폼 제출 - loginData:", loginData);
    dispatch(login(loginData));
  };

  useEffect(() => {
    console.log("@@@@ GetAuthMain useEffect - checkRedirectResult 호출");
    console.log(`loginError`, loginError);
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

  return (
    <Container className="mt-5">
      <h1 className="text-center">회원가입 / 로그인</h1>
      <Row className="justify-content-center">
        <Col md={6} className="text-center">
        <LoginButtons onLoginClick={handleLoginClick} />
        </Col>
      </Row>
      {showLoginForm && <LoginForm onSubmit={handleLoginSubmit} />}
    </Container>
  );
};

export default GetAuthMain;
