import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, setMember } from '../../redux/slices/authSlice';
import styles from '../../assets/css/module/member/GetAuthMain.module.css';
import { Container, Row, Col } from 'react-bootstrap';
import { checkRedirectResult, handleGoogleLogin } from './function/googleLogin';
import LoginButtons from './component/LoginButtons';
import BackgroundTemplate from '../../components/common/BackgroundTemplate';
import ForegroundTemplate from '../../components/common/ForegroundTemplate';
import NoonLogo from '../../assets/css/NoonLogo';
import { auth } from '../../firebase';
import { clearAllCookies } from './function/memberFunc';
import useFooterToggle from '../../components/hook/useFooterToggle';
import { setFooterEnbaled } from '../../redux/slices/footerEnabledSlice';
const GetAuthMain = () => {
  
  console.log("#### GetAuthMain 컴포넌트 초기화 시작");
  const navigate = useNavigate();
  // const loginError = useSelector((state) => state.auth.loginError);
  // const [isAuthInitialized, setIsAuthInitialized] = useState(false);
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setFooterEnbaled(false));
    return () => {
      dispatch(setFooterEnbaled(true));
    };
  });

  const handleLoginClick = () => {
    console.log("$$$$ 일반 로그인 버튼 클릭");
    navigate('/member/loginForm');
  };

  const handleGoogleLoginClick = () => {
    console.log("$$$$ 구글 로그인 버튼 클릭");
    clearAllCookies();
    handleGoogleLogin(dispatch,navigate);
  };

  // useEffect(() => {
  //   // Firebase auth 객체가 초기화되는지 확인
  //   const checkAuthInitialization = () => {
  //     if (auth) {
  //       // alert("Firebase auth 객체가 초기화되었습니다.");
  //       setIsAuthInitialized(true);
  //     } else {
  //       //alert("Firebase auth 객체가 초기화되지 않았습니다.");
  //       console.error("Firebase auth 객체가 초기화되지 않았습니다.");
  //     }
  //   };

  //   checkAuthInitialization();
  // }, []);


  // useEffect(() => {
  //   if (!isAuthInitialized) {
  //     return;
  //   }

  //   console.log("@@@@ GetAuthMain useEffect - checkRedirectResult 호출");
  //   console.log(`loginError`, loginError);
    
  //   const getResult = async () => {
  //     console.log("$$$$ getResult 함수 시작");
  //     const response = await checkRedirectResult(dispatch);
  //     console.log("checkRedirectResult 결과:", response); // 여기는 토큰과 유저가 온다.
  //     // alert("checkRedirectResult 결과:"+ response); // 여기는 토큰과 유저가 온다.
  //     const info = response?.user;
  //     const token = response?.token;
  //     if (info?.email && info?.email !== "") {
  //       const loginData = {
  //         member: {
  //           authorizeCode: token,
  //           memberId: info?.email,
  //           nickname: info?.displayName,
  //           profilePhotoUrl: info?.photoURL,
  //           phoneNumber: info?.phoneNumber
  //         },
  //         loginWay: "google"
  //       };
  //       console.log("$$$$ 구글 로그인 시도");
  //       dispatch(login({ loginData, navigate }));
  //     }
  //   };

  //   getResult();
  // }, [dispatch, loginError, navigate, isAuthInitialized]);

  return (
    <ForegroundTemplate>
      <LoginButtons onLoginClick={handleLoginClick} onGoogleLoginClick={handleGoogleLoginClick} />
    </ForegroundTemplate>
  );
};

export default GetAuthMain;
