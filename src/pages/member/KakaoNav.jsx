import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { login } from '../../redux/slices/authSlice';
import { getCookie } from '../../util/cookies';
import { decryptWithIv } from '../../util/crypto';
import { navigateMainPage } from '../../util/mainPageUri';

const KakaoNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const StoreMemberId = useSelector((state) => state.auth.member.memberId);
  const [loginWay,setLoginWay] = useState(null);
  console.log('#### KakaoNav 컴포넌트 시작');

  useEffect(() => {
    console.log("@@@@ KakaoNav useEffect1 시작")
    const searchParams = new URLSearchParams(location.search);
    setLoginWay(searchParams.get('loginWay'));
  },[loginWay]);

  useEffect(() => {
    console.log(`@@@@ KakaoNav useEffect2 시작`);
    let encryptedMemberId = getCookie("Member-ID");
    let IV = getCookie("IV");
    let memberId;
    console.log("암호화된 멤버ID :: "+encryptedMemberId);
    console.log("암호화된 IV :: "+IV);

    if (encryptedMemberId !== null && IV !== null) {
        memberId = decryptWithIv(encryptedMemberId,IV);
    }

    console.log("암호화 해제한 멤버ID"+memberId);
    const loginWayValue = 'kakao';


    // const mainPageUri = process.env.REACT_APP_MAIN_PAGE_URI;
    // const navigateUri = `${mainPageUri}/${encryptedMemberId}`;

    // const test = process.env.REACT_APP_API_BASE_URL;
    console.log('loginWay:', loginWay);
    // console.log('accessToken:', accessToken);
    console.log('encryptedMemberId:', encryptedMemberId);
    console.log('memberId:', memberId)
    // console.log('navigateUri:', navigateUri);
    // console.log(test);
    // console.log(mainPageUri);

    if (loginWay === loginWayValue && memberId) {
      // 로그인 데이터 준비
      const loginData = {
        member : {memberId: memberId},
        loginWay: loginWay
      };
      console.log("정상적으로 로그인 데이터 준비 완료", loginData)
      // 로그인 함수 디스패치
      dispatch(login(loginData)).then(() => {
        //여기는 다시 encrypted를 보내야한다.
        console.log("메인으로 네비게이트합니다.");
        const newEncryptedToId = encodeURIComponent(encryptedMemberId);
        const newIV = encodeURIComponent(IV);
        console.log("네비게이트하기전 확인 :: ", newEncryptedToId,newIV);
        navigateMainPage(newEncryptedToId,newIV,navigate);
        // navigateMainPage(123,456,navigate);
      });
    }

    
  }, [dispatch, location.search, navigate,StoreMemberId,loginWay]);

  return null;
};

export default KakaoNav;
