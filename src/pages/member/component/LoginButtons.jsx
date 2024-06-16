import React from 'react';
import { Button, Spinner, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { handleKakaoLogin } from '../function/kakaoLogin';
import { handleGoogleLogin } from '../function/googleLogin';
import SignUpButton from './SignUpButton';
import styles from '../../../assets/css/module/member/GetAuthMain.module.css';

const LoginButtons = ({ onLoginClick }) => {
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.auth.loginStatus);
  const authorization = useSelector((state) => state.auth.authorization);

  return (
    <div className={styles.loginButtons}>
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
      <Button onClick={() => handleGoogleLogin(dispatch)} variant="danger" className="mb-3">
        구글 로그인
      </Button>
      <Button onClick={onLoginClick} variant="primary" className="mb-3">
        일반 로그인
      </Button>
      <SignUpButton />
      {loginStatus === 'loading' && <Spinner animation="border" />}
      {authorization && <Alert variant="success">로그인 성공!</Alert>}
    </div>
  );
};

export default LoginButtons;
