import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/slices/memberSlice';
import LoginForm from '../../components/member/LoginForm';

const GetAuthMain = () => {
    const dispatch = useDispatch();

    const [showLoginForm, setShowLoginForm] = useState(false);

    const loginStatus = useSelector((state) => state.loginStatus);
    const loginError = useSelector((state) => state.loginError);
    const isAuthenticated = useSelector((state) => state.isAuthenticated);

    const handleKakaoLogin = (event) => {
        event.preventDefault(); // 기본 동작 막기
        console.log("카카오 로그인 버튼 클릭");
        const redirectUri = process.env.REACT_APP_MEMBER_API_BASE_URL+"/kakaoLogin";
        console.log("redirectUri :: ", redirectUri);
        const encodedUri = encodeURIComponent(redirectUri);
        console.log(encodedUri);
        const clientId = process.env.REACT_APP_KAKAO_CLIENT_ID;
        // window.location.href =
        //   `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodedUri}`;
      };

      const handleLogin = () => {
        const loginData = {
          memberId: 'member_100',
          pwd: 'password'
        };
        dispatch(login(loginData));
      };

      const handleLoginClick = () => {
        setShowLoginForm(true);
        };

    const handleLoginSubmit = (loginData) => {
        dispatch(login(loginData));
    };

    return (
        <div>
            <h1>GetAuthMain</h1>
            <button onClick={handleKakaoLogin}>카카오 로그인</button>
            <button onClick={handleLoginClick}>일반 로그인</button>
            {loginStatus === 'loading' && <p>로그인 중...</p>}
            {loginStatus === 'failed' && <p>로그인 실패: {loginError}</p>}
            {isAuthenticated && <p>로그인 성공!</p>}

            {showLoginForm && <LoginForm onSubmit={handleLoginSubmit} />}
        </div>
    );
};

export default GetAuthMain;