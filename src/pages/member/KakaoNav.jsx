import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { login } from '../../redux/slices/authSlice';
import { getCookie } from '../../util/cookies';
import { encrypt } from '../../util/crypto';

const KakaoNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log('KakaoNav 컴포넌트 시작')
    const searchParams = new URLSearchParams(location.search);
    const loginWay = searchParams.get('loginWay');
    // const accessToken = searchParams.get('access_token');
    const accessToken = getCookie(`Authorization`);
    const memberId = getCookie(`Member-ID`);
    const encryptedMemberId = encrypt(memberId);
    // const memberId = searchParams.get('memberId');
    const loginWayValue = 'kakao';
    const mainPageUri = process.env.REACT_APP_MAIN_PAGE_URI;
    const navigateUri = `${mainPageUri}/${encryptedMemberId}`;
    const test = process.env.REACT_APP_API_BASE_URL;
    console.log('loginWay:', loginWay);
    console.log('accessToken:', accessToken);
    console.log('memberId:', memberId);
    console.log('navigateUri:', navigateUri);
    console.log(test);
    console.log(mainPageUri);

    if (loginWay === loginWayValue && memberId) {
      // 로그인 데이터 준비
      const loginData = {
        token: accessToken,
        memberId: memberId,
        loginWay: loginWayValue
      };
      console.log("정상적으로 로그인 데이터 준비 완료", loginData)
      // 로그인 함수 디스패치
      dispatch(login(loginData)).then(() => {
        navigate(navigateUri);
      });
    }
  }, [dispatch, location.search, navigate]);

  return null;
};

export default KakaoNav;
